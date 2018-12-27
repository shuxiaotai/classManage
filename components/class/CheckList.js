import React, { Component } from 'react';
import {View, AlertIOS, Alert} from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";
import PublicImageItem from "../../public/components/PublicImageItem";
import { connect } from 'react-redux';
import CheckChart from "./CheckChart";
import fetchData from "../../public/utils/fetchData";
import {checkUser} from "../../public/utils/checkUser";

const checkItem = [
    {
        id: '0',
        name: '出勤'
    },
    {
        id: '1',
        name: '缺勤'
    },
    {
        id: '2',
        name: '迟到'
    },
    {
        id: '3',
        name: '请假'
    },
];
let newStudentList = [];

class CheckList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            changeCheckState: false,
            checkChartDetailList: []
        };
        newStudentList = [];
        props.studentList.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            obj.avatar_url = item['avatar_url'];
            obj.checkTipsId = 0;
            newStudentList.push(obj);
        });
    }
    componentDidMount() {
        const { isDetail, checkId } = this.props;
        if (isDetail && checkId) {
            const { navigate } = this.props.navigation;
            checkUser(() => {
                fetchData.postData('/checkChartDetailList',
                    {
                        checkId: checkId
                    }
                ).then((val) => {
                    this.setState({
                        checkChartDetailList: val.checkChartDetailList
                    })
                });
            }, navigate);
        }
    }
    changeCheckTips = (item) => {
        if (item.checkTipsId === 3) {
            item.checkTipsId = 0;
        }else {
            item.checkTipsId++;
        }
        this.setState({
            changeCheckState: !this.state.changeCheckState
        })
    };
    toCheckChart = (val) => {
        const { navigate } = this.props.navigation;
        const { currentClassId, studentList } = this.props;
        if (val === '') {
            alert('考勤名称不能为空');
        }else {
            checkUser(() => {
                fetchData.postData('/addCheck',
                    {
                        checkName: val,
                        checkStudentList: newStudentList,
                        classId: currentClassId
                    }
                ).then((value) => {
                    if (value.addCheckSuccess) {
                        Alert.alert(
                            'Alert',
                            `创建考勤成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        newStudentList = [];
                                        studentList.forEach((item) => {
                                            let obj = {};
                                            obj.id = item.id;
                                            obj.name = item.name;
                                            obj.avatar_url = item['avatar_url'];
                                            obj.checkTipsId = 0;
                                            newStudentList.push(obj);
                                        });
                                        this.setState({
                                            changeCheckState: !this.state.changeCheckState
                                        });
                                        navigate('CheckChart');
                                    }},
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('创建考勤失败');
                    }
                });
            }, navigate);
        }
    };
    saveCheckRecord = () => {
        AlertIOS.prompt(
            'Alert',
            '给这次考勤起个名字吧',
            [
                {
                    text: '取消',
                    onPress: () => console.log('取消'),
                    style: 'cancel',
                },
                {
                    text: '确认',
                    onPress: (val) => this.toCheckChart(val),
                },
            ],
        );
    };
    render() {
        const { isDetail } = this.props;
        const { checkChartDetailList } = this.state;
        return(
            <View>
                <PublicImageItem
                    checkItem={checkItem}
                    changeCheckTips={this.changeCheckTips}
                    data={isDetail ? checkChartDetailList : newStudentList}
                />
                {
                    isDetail ? null :
                        (newStudentList.length === 0 ? null :
                                <PublicBtn
                                    tips="保存考勤记录"
                                    onPress={this.saveCheckRecord}
                                />
                        )
                }
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        studentList: state.studentReducer.studentList,
        currentClassId: state.classReducer.currentClassId
    }
};
export default connect(mapStateToProps)(CheckList);