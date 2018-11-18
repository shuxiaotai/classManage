import React, { Component } from 'react';
import {View, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import StudentList from "./StudentList";
import StudentGroupList from "./StudentGroupList";
import PublicModal from "../../public/components/PublicModal";
import RemarkModalContent from "./RemarkModalContent";
import PublicMask from "../../public/components/PublicMask";
import GroupModalContent from "./GroupModalContent";
import ParentList from "./ParentList";
import PublicScrollView from "../../public/components/PublicScrollView";
import RandomModalContent from "./RandomModalContent";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import { connect } from 'react-redux';
import * as studentActions from './Actions/studentAction';
import * as parentActions from './Actions/parentAction';
import * as groupActions from './Actions/groupAction';
import PublicNoContent from "../../public/components/PublicNoContent";

const tabItem = [
    {
        name: '学生',
        key: 1,
    }, {
        name: '小组',
        key: 2,
    },  {
        name: '家长',
        key: 3,
    }
];
const tabItemIsMaster = [
    {
        name: '学生',
        key: 1,
    }, {
        name: '考勤',
        key: 2,
    }, {
        name: '家长',
        key: 3,
    }
];
class ClassDetailList extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
            isStudentVisible: false,
            isGroupVisible: false,
            isRandomVisible: false,
        }
    }
    componentDidMount() {
        this.getStudentList();
    }
    getStudentList = (isFresh, freshFun) => {
        const { navigate } = this.props.navigation;
        const { currentClassId, setStudentList } = this.props;
        checkUser(() => {
            fetchData.postData('/studentList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setStudentList(val.studentList);
                if(isFresh) {
                    freshFun();
                }
            });
        }, navigate);
    };
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        });
        if (key === 1) {
            this.getStudentList();
        }else if(key === 2) {
            this.getGroupList();
        }else if(key === 3) {
            this.getParentList();
        }
    };
    getGroupList = () => {
        const { navigate } = this.props.navigation;
        const { currentClassId, setGroupList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/groupList',
                    {
                        username: value.username,
                        currentClassId: currentClassId,
                    }
                ).then((val) => {
                    setGroupList(val.groupList);
                });
            });
        }, navigate);
    };
    getParentList = () => {
        const { navigate } = this.props.navigation;
        const { currentClassId, setParentList } = this.props;
        checkUser(() => {
            fetchData.postData('/parentList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setParentList(val.parentList);
            });
        }, navigate);
    };
    handleStudentListModal = (visible) => {
        this.setState({
            isStudentVisible: visible
        })
    };
    handleGroupListModal = (visible) => {
        this.setState({
            isGroupVisible: visible
        })
    };
    toStudentHomePage = () => {
        const { navigate } = this.props.navigation;
        navigate('StudentHomePage');
    };
    toEditGroup = () => {
        const { navigate } = this.props.navigation;
        navigate('EditGroupInfo');
    };
    handleRandomModal = (visible) => {
        this.setState({
            isRandomVisible: visible
        })
    };
    render() {
        const { navigation, studentList, parentList, groupList, setCurrentStudent, currentStudent } = this.props;
        const { grade, name, isMaster } = navigation.state.params;   //isMaster：0是任课老师，1是班主任
        const { selectKey, isStudentVisible, isGroupVisible, isRandomVisible } = this.state;
        return(
            <View>
                <PublicMask
                    isVisible={isRandomVisible ? isRandomVisible : (isStudentVisible ? isStudentVisible : isGroupVisible)}
                    handleModal={isRandomVisible ? this.handleRandomModal : (isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal)}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height}
                />
                <PublicModal
                    isVisible={isRandomVisible ? isRandomVisible : (isStudentVisible ? isStudentVisible : isGroupVisible)}
                    width={300}
                    height={isStudentVisible ? 400 : 400}
                    leftFun={isRandomVisible ? null : (isStudentVisible ? this.toStudentHomePage : this.toEditGroup)}
                    handleModal={isRandomVisible ? this.handleRandomModal : (isStudentVisible ? this.handleStudentListModal : this.handleGroupListModal)}
                    modalLeft={isRandomVisible ? '' : ((isStudentVisible && isGroupVisible) ? '' : (isStudentVisible ? '学生主页' : '编辑小组'))}
                    modalTitle={isRandomVisible ? '随机抽选' : ((isStudentVisible && isGroupVisible) ? '点评第一小组' : (isStudentVisible ? `点评${currentStudent.name}` : '第一小组'))}
                    renderComponent={
                        isRandomVisible ?
                            <RandomModalContent />
                            : (
                            isStudentVisible ?
                                <RemarkModalContent
                                    navigation={navigation}
                                    isMaster={isMaster}
                                /> :
                                <GroupModalContent
                                    handleModal={this.handleStudentListModal}   //点评小组
                                />
                            )
                    }
                />
                <PublicHeader title={`${grade}${name}`} isLeft={true} navigation={navigation} />
                <PublicTab tabItem={isMaster === 1 ? tabItemIsMaster : tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ?
                        <StudentList
                            navigation={navigation}
                            studentList={studentList}
                            handleModal={this.handleStudentListModal}
                            handleRandomModal={this.handleRandomModal}
                            isMaster={isMaster}
                            updateFun={this.getStudentList}
                            setCurrentStudent={setCurrentStudent}
                        /> : null
                }
                {
                    selectKey === 2 ?
                        (isMaster === 0 ?
                            <StudentGroupList
                                navigation={navigation}
                                groupList={groupList}
                                handleModal={this.handleGroupListModal}
                            /> : null
                        ) : null
                }
                {
                    selectKey === 3 ?
                        <PublicScrollView
                            renderView={parentList.length === 0 ? <PublicNoContent tips="暂无家长" /> : <ParentList parentList={parentList} /> }
                        /> :
                        null
                }
            </View>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        currentClassId: state.classReducer.currentClassId,
        studentList: state.studentReducer.studentList,
        parentList: state.parentReducer.parentList,
        groupList: state.groupReducer.groupList,
        currentStudent: state.studentReducer.currentStudent
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStudentList: (studentList) => {
            dispatch(studentActions.setStudentList(studentList));
        },
        setParentList: (parentList) => {
            dispatch(parentActions.setParentList(parentList));
        },
        setGroupList: (groupList) => {
            dispatch(groupActions.setGroupList(groupList))
        },
        setCurrentStudent: (currentStudent) => {
            dispatch(studentActions.setCurrentStudent(currentStudent));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailList);

















