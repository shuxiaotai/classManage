import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import listData from '../../public/mockData/listData';
import PublicRefreshList from "../../public/components/PublicRefreshList";
import fetchData from "../../public/utils/fetchData";
import { checkUser, getTokenInfo } from '../../public/utils/checkUser';
import * as classActions from '../class/Actions/classAction';

const tabItem = [
    {
        name: '我是任课老师',
        key: 0,
    },
    {
        name: '我是班主任',
        key: 1,
    }
];

class ClassScreen extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 0,
            dataArr: []
        }
    }
    componentDidMount() {
        //到时候在这边把老师和家长区分
        // console.log(new Date().toLocaleString());
        // console.log(+new Date());
        this.getClassList(0);
    }
    getClassList = (key) => {
        const { navigate } = this.props.navigation;
        const { setClassList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/classList',
                    {
                        teacherId: value.id,
                        selectIdentity: value.selectIdentity,
                        isCreateByMe: key
                    }
                ).then((val) => {
                    setClassList(val.classList);
                });
            });
        }, navigate);
    };
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key,
        });
        this.getClassList(key)
    };
    getClassDetail = (id, grade, name, isMaster) => {
        const { navigate } = this.props.navigation;
        const { setCurrentClassId } = this.props;
        navigate('ClassDetailList', { grade, name, isMaster });
        setCurrentClassId(id);
    };
    getRenderItem = () => {
        const { selectKey } = this.state;  //区分任课老师还是班主任
        return({item}) => (
            <TouchableWithoutFeedback onPress={() => this.getClassDetail(item.id, item.grade, item.name, selectKey)}>
                <View style={styles.mainItem}>
                    <Image
                        source={require('../../public/img/test.png')}  //{uri: item.imgSrc}
                        style={styles.mainImg}
                    />
                    <View style={styles.mainText}>
                        <Text>{item.grade}{item.name}</Text>
                        <Text style={styles.stu}>{item['student_count']}个学生</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    //获取模拟数据
    getList = (page) => {
        switch (page) {
            case 1:
                this.setState({
                    dataArr: listData.classList1
                });
                break;
            case 2:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2)
                });
                break;
            case 3:
                this.setState({
                    dataArr: listData.classList1.concat(listData.classList2.concat(listData.classList3))
                });
                break;

        }
    };
    render() {
        const { selectKey, dataArr } = this.state;
        const { classList } = this.props;
        return(
            <View>
                <PublicHeader title="课堂" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={classList}
                            getList={this.getList}
                            totalPage={1}
                            ListEmptyComponent={<PublicNoContent tips="暂无创建的班级" />}
                        />
                    </View> :
                    <View style={styles.main}>
                        <PublicRefreshList
                            getRenderItem={this.getRenderItem}
                            dataArr={classList}
                            getList={this.getList}
                            totalPage={1}
                            ListEmptyComponent={<PublicNoContent tips="暂无管理的班级" />}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 8,
        height: '100%',
    },
    mainItem: {
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    mainImg: {
        width: 48,
        height: 48,
        borderRadius: 25
    },
    mainText: {
        marginLeft: 15,
    },
    stu: {
        fontSize: 11,
        marginTop: 5,
        color: 'gray'
    },
});
const mapStateToProps = (state) => {
    return {
        classList: state.classReducer.classList,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClassList: (classList) => {
            dispatch(classActions.setClassList(classList));
        },
        setCurrentClassId: (currentClassId) => {
            dispatch(classActions.setCurrentClassId(currentClassId));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen);