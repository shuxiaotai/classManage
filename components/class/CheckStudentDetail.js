import React, { Component } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicSelectTime from "../../public/components/PublicSelectTime";
import PublicMask from "../../public/components/PublicMask";
import listData from "../../public/mockData/listData";
import PublicImageItem from "../../public/components/PublicImageItem";
import fetchData from "../../public/utils/fetchData";
import {checkUser} from "../../public/utils/checkUser";
import { connect } from 'react-redux';
import * as checkActions from "./Actions/checkAction";


const selectCheckCountList = [
    {
        id: 0,
        name: '按全勤次数'
    },
    {
        id: 1,
        name: '按缺勤次数'
    },
    {
        id: 2,
        name: '按迟到次数'
    },
    {
        id: 3,
        name: '按请假次数'
    }
];
class CheckStudentDetail extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            selectTabKey: 0,   //0是时间，1是出勤等
            selectTimeKey: 1,   //时间选哪个
            selectCheckCountKey: 0,  //出勤等选项选哪个
            selectTimeName: '本周',
            selectCheckCountName: '按全勤次数'
        }
    }
    componentDidMount() {
        this.fetchCheckStudentDetailList(1, 0);
    }
    fetchCheckStudentDetailList = (time, state) => {
        const { navigation, currentClassId, setStudentCheckDetailList } = this.props;
        const { navigate } = navigation;
        const { isParent, studentId } = navigation.state.params;
        checkUser(() => {
            fetchData.postData('/studentCheckDetailList',
                {
                    time: time,
                    classId: isParent === 1 ? '-1' : currentClassId,
                    studentId: isParent === 1 ? studentId : '-1',
                    checkState: state
                }
            ).then((val) => {
                setStudentCheckDetailList(val.studentCheckDetailList);
            });
        }, navigate);
    };
    handleShowSelectTime = (selectTabKey) => {    //显示和关闭两个下拉框
        this.setState({
            showSelectTime: !this.state.showSelectTime,
            selectTabKey: selectTabKey
        })
    };
    selectTimeFun = (id, name) => {
        const { selectCheckCountKey } = this.state;
        this.fetchCheckStudentDetailList(id, selectCheckCountKey);
        this.setState({
            selectTimeKey: id,
            showSelectTime: false,
            selectTimeName: name,
        });
    };
    selectCheckCountFun = (id, name) => {
        const { selectTimeKey } = this.state;
        this.fetchCheckStudentDetailList(selectTimeKey, id);
        this.setState({
            selectCheckCountKey: id,
            showSelectTime: false,
            selectCheckCountName: name,
        });
    };
    render() {
        const { navigation, studentCheckDetailList } = this.props;
        const { showSelectTime, selectTabKey, selectTimeKey, selectTimeName, selectCheckCountKey, selectCheckCountName } = this.state;
        return(
            <View>
                <PublicHeader
                    title="考勤学生详情"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.selectItemContainer}>
                    <PublicSelectTime
                        selectTimeName={selectTimeName}
                        showSelectTime={selectTabKey === 0 ? showSelectTime : false}
                        selectTimeKey={selectTimeKey}
                        top={27}
                        data={listData.selectTimeList}
                        handleShowSelectTime={() => this.handleShowSelectTime(0)}
                        selectTimeFun={this.selectTimeFun}
                    />
                    <PublicSelectTime
                        selectTimeName={selectCheckCountName}
                        showSelectTime={selectTabKey === 1 ? showSelectTime : false}
                        selectTimeKey={selectCheckCountKey}
                        top={27}
                        arrowRight={20}
                        data={selectCheckCountList}
                        height={160}
                        handleShowSelectTime={() => this.handleShowSelectTime(1)}
                        selectTimeFun={this.selectCheckCountFun}
                    />
                </View>
                <PublicImageItem
                    isShowSelectRightName={true}
                    selectRightFrontName={selectCheckCountName.slice(1, 3)}
                    selectRightEndName='次'
                    selectRightKey='state_count'
                    data={studentCheckDetailList}
                />
                <PublicMask
                    isVisible={showSelectTime}
                    width={'100%'}
                    height={Dimensions.get('window').height - 104}
                    top={104}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    selectItemContainer: {
        height: 40,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    checkListContainer: {
        width: '100%',
        marginTop: 10
    },
    checkListItem: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    stuAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 10
    },
    checkTips: {
        position: 'absolute',
        right: 20
    }
});
const mapStateToProps = (state) => {
    return {
        studentCheckDetailList: state.checkReducer.studentCheckDetailList,
        currentClassId: state.classReducer.currentClassId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStudentCheckDetailList: (studentCheckDetailList) => {
            dispatch(checkActions.setStudentCheckDetailList(studentCheckDetailList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckStudentDetail);