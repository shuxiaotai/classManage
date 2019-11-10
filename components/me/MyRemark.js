import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import PublicHeader from '../../public/components/PublicHeader';
import getProtocol from '../../public/utils/getProtocol';
import {checkUser, getTokenInfo} from '../../public/utils/checkUser';
import fetchData from '../../public/utils/fetchData';
import moment from 'moment/moment';
import PublicNoContent from '../../public/components/PublicNoContent';
import PublicRefreshList from '../../public/components/PublicRefreshList';

class MyRemark extends Component {
  constructor() {
    super();
    this.state = {
      teacherRemarkList: [],
      start: 1,
      count: '',
    };
  }
  componentDidMount() {
    this.fetchMyRemark();
  }
  componentWillUnmount() {
    this.fetchMyRemark = null;
  }
  fetchMyRemark = (start, func = '') => {
    let realFunc = func;
    const {navigate} = this.props.navigation;
    checkUser(() => {
      getTokenInfo().then(value => {
        fetchData
          .postData('/teacherRemark', {
            teacherId: value.id,
            start: start, //第几页
          })
          .then(val => {
            this.setState({
              teacherRemarkList: val.teacherRemarkList,
              count: Math.ceil(val.count / 11),
            });
            if (realFunc !== '') {
              realFunc();
            }
          });
      });
    }, navigate);
  };
  getRenderMyRemarkItem = () => {
    return ({item}) => {
      return (
        <View style={styles.myRemarkItem} key={item.id}>
          <Image
            source={
              item.img_url
                ? {uri: getProtocol() + item.img_url}
                : require('../../public/img/teacher.jpg')
            }
            style={styles.projectImg}
          />
          <View>
            <View style={styles.remarkTop}>
              <Text style={item.is_praise ? styles.score : ''}>
                {item.is_praise === '0'
                  ? '+'
                  : item.is_praise === '1'
                  ? '-'
                  : ''}
                {item.score ? item.score : ''}
                {item.score ? '分' : ''}
              </Text>
              <Text>
                {item.is_praise === '0'
                  ? '表扬'
                  : item.is_praise === '1'
                  ? '批评'
                  : '自定义点评'}
                给{item.student_name} {item.template_name ? '因为' : ''}
                {item.template_name}
              </Text>
            </View>
            <View style={styles.remarkBottom}>
              <Text style={styles.bottomText}>
                {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')} 发送给
                {item.group_name}
              </Text>
            </View>
          </View>
        </View>
      );
    };
  };
  render() {
    const {navigation} = this.props;
    const {teacherRemarkList, count} = this.state;
    return (
      <View style={{height: '100%', marginBottom: 120}}>
        <PublicHeader title="我的点评" isLeft={true} navigation={navigation} />
        <PublicRefreshList
          getRenderItem={this.getRenderMyRemarkItem}
          dataArr={teacherRemarkList}
          totalPage={0}
          getList={this.fetchMyRemark}
          ListEmptyComponent={<PublicNoContent tips="暂无点评" />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  projectImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  remarkTop: {
    flexDirection: 'row',
  },
  remarkBottom: {
    flexDirection: 'row',
    marginTop: 5,
  },
  myRemarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  score: {
    color: '#3498db',
    marginRight: 10,
  },
  bottomText: {
    color: 'gray',
    fontSize: 12,
  },
});
export default MyRemark;
