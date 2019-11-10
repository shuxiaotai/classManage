import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import fetchData from '../../public/utils/fetchData';
import {checkUser} from '../../public/utils/checkUser';
import getProtocol from '../../public/utils/getProtocol';

class GroupModalContent extends Component {
  constructor() {
    super();
    this.state = {
      selectGroupList: [],
    };
  }
  componentDidMount() {
    const {navigate} = this.props.navigation;
    const {currentGroup, setStudentOfGroup} = this.props;
    checkUser(() => {
      fetchData
        .postData('/studentListOfGroup', {
          groupId: currentGroup.id,
        })
        .then(val => {
          let studentListOfGroupTemp = [];
          val.studentListOfGroup.forEach(item => {
            studentListOfGroupTemp.push(item.id);
          });
          this.setState({
            selectGroupList: studentListOfGroupTemp,
          });
          setStudentOfGroup(val.studentListOfGroup);
        });
    }, navigate);
  }
  selectGroupStudent = id => {
    const {selectGroupList} = this.state;
    let index = selectGroupList.indexOf(id);
    if (index === -1) {
      selectGroupList.push(id);
    } else {
      selectGroupList.splice(index, 1);
    }
    this.setState({
      selectGroupList: selectGroupList,
    });
  };
  renderGroupStudentList = () => {
    const {selectGroupList} = this.state;
    const {studentOfGroup} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.remarkContainer}>
        {studentOfGroup.map(item => {
          return (
            <TouchableOpacity
              style={styles.remarkItem}
              key={item.id}
              activeOpacity={0.8}
              onPress={() => this.selectGroupStudent(item.id)}>
              <View style={styles.checkIcon}>
                <Icon
                  name="check-circle"
                  color={
                    selectGroupList.indexOf(item.id) !== -1 ? '#3498db' : 'gray'
                  }
                  size={20}
                />
              </View>
              <Image
                source={{uri: getProtocol() + item.avatar_url}}
                style={styles.remarkImg}
              />
              <Text style={styles.remark}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  publishRemarkGroup = () => {
    const {selectGroupList} = this.state;
    const {
      handleModal,
      setIsRemarkGroup,
      setRemarkGroupStudentIds,
    } = this.props;
    if (selectGroupList.length === 0) {
      alert('请选择至少一名学生');
    } else {
      handleModal(true);
      setIsRemarkGroup(true);
      setRemarkGroupStudentIds(selectGroupList);
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderGroupStudentList()}
        <TouchableOpacity
          style={styles.remarkOnGroup}
          activeOpacity={0.7}
          onPress={this.publishRemarkGroup}>
          <Text style={styles.remarkOnGroupText}>点评小组</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stuAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailText: {
    fontSize: 12,
    marginTop: 7,
  },
  remarkContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: 15,
  },
  remarkItem: {
    display: 'flex',
    width: 89,
    alignItems: 'center',
    marginBottom: 8,
  },
  remarkImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  remark: {
    marginTop: 8,
  },
  checkIcon: {
    position: 'relative',
    right: -23,
    top: 16,
    zIndex: 100,
  },
  remarkOnGroup: {
    height: 45,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remarkOnGroupText: {
    color: '#fff',
  },
});

export default GroupModalContent;
