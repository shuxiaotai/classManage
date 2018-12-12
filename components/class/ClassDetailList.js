import React, { Component } from 'react';
import {View, Dimensions, Text} from 'react-native';
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
import CheckList from "./CheckList";

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
            showRandoming: false
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
                    if (freshFun) {
                        freshFun();
                    }
                }
            });
        }, navigate);
    };
    getGroupList = (isFresh, freshFun) => {
        const { navigate } = this.props.navigation;
        const { currentClassId, setGroupList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/groupList',
                    {
                        teacherId: value.id,
                        currentClassId: currentClassId,
                    }
                ).then((val) => {
                    setGroupList(val.groupList);
                    if(isFresh) {
                        if (freshFun) {
                            freshFun();
                        }
                    }
                });
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
    handleStudentAndGroupListModal = (visible) => {
        this.setState({
            isStudentVisible: visible,
            isGroupVisible: visible
        })
    };
    toStudentHomePage = () => {
        const { navigate } = this.props.navigation;
        const { isMaster } = this.props.navigation.state.params;
        navigate('StudentHomePage', {
            handleStudentListModal: this.handleStudentListModal,
            isMaster: isMaster,
            getStudentList: this.getStudentList
        });
    };
    toEditGroup = () => {
        const { navigate } = this.props.navigation;
        navigate('EditGroupInfo', {
            handleGroupListModal: this.handleGroupListModal,
            getGroupList: this.getGroupList
        });
    };
    handleRandomModal = (visible) => {
        this.setState({
            isRandomVisible: visible
        });
    };
    showRandomModal = (visible) => {
        this.setState({
            showRandoming: visible
        })
    };
    render() {
        const { navigation, studentList, parentList, groupList, setCurrentStudent, currentStudent, setCurrentGroup, currentGroup, setStudentOfGroup, studentOfGroup, setIsRemarkGroup, setRemarkGroupStudentIds, isRemarkGroup, remarkGroupStudentIds } = this.props;
        const { navigate } = navigation;
        const { grade, name, isMaster } = navigation.state.params;   //isMaster：0是任课老师，1是班主任
        // const isMaster = 1;
        const { selectKey, isStudentVisible, isGroupVisible, isRandomVisible, showRandoming } = this.state;
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
                    modalLeft={isRandomVisible ? '' : ((isStudentVisible && isGroupVisible) ? '' : (isStudentVisible ? `${showRandoming ? '' : '学生主页'}` : '编辑小组'))}
                    modalTitle={isRandomVisible ? '随机抽选' : ((isStudentVisible && isGroupVisible) ? `点评${currentGroup.name}` : (isStudentVisible ? `点评${currentStudent.name}` : `${currentGroup.name}`))}
                    renderComponent={
                        isRandomVisible ?    //显示随机抽选modal
                            <RandomModalContent
                                studentList={studentList}
                                handleStudentListModal={this.handleStudentListModal}
                                setCurrentStudent={setCurrentStudent}
                                handleRandomModal={this.handleRandomModal}
                                showRandomModal={this.showRandomModal}
                            />
                            : (
                            isStudentVisible ?
                                <RemarkModalContent
                                    navigation={navigation}
                                    isMaster={isMaster}
                                    handleStudentListModal={this.handleStudentListModal}
                                    isRemarkGroup={isRemarkGroup}
                                    currentGroup={currentGroup}
                                    remarkGroupStudentIds={remarkGroupStudentIds}
                                    handleGroupListModal={this.handleGroupListModal}
                                    handleStudentAndGroupListModal={this.handleStudentAndGroupListModal}
                                    getStudentList={this.getStudentList}
                                    getGroupList={this.getGroupList}
                                /> :
                                (selectKey === 2 && isGroupVisible ?
                                    <GroupModalContent
                                        handleModal={this.handleStudentListModal}   //点评小组
                                        navigation={navigation}
                                        currentGroup={currentGroup}
                                        setStudentOfGroup={setStudentOfGroup}
                                        studentOfGroup={studentOfGroup}
                                        setIsRemarkGroup={setIsRemarkGroup}
                                        setRemarkGroupStudentIds={setRemarkGroupStudentIds}
                                    /> : null)
                            )
                    }
                />
                <PublicHeader
                    title={`${grade}${name}`}
                    isLeft={true}
                    navigation={navigation}
                    isRight={isMaster === 1 && selectKey === 2}
                    rightComponent={isMaster === 1 && selectKey === 2 ? <Text style={{ color: '#fff' }}>考勤报表</Text> : null}
                    rightPressFun={() => navigate('CheckChart')}
                />
                {/*<PublicHeader title="暂时" isLeft={true} navigation={navigation} />*/}
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
                            getStudentList={this.getStudentList}
                        /> : null
                }
                {
                    selectKey === 2 ?
                        (isMaster === 0 ?
                            <StudentGroupList
                                navigation={navigation}
                                groupList={groupList}
                                handleModal={this.handleGroupListModal}
                                setCurrentGroup={setCurrentGroup}
                                updateFun={this.getGroupList}
                                getGroupList={this.getGroupList}
                                studentList={studentList}
                            /> : 
                            <CheckList
                                navigation={navigation}
                            />
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
        currentStudent: state.studentReducer.currentStudent,
        currentGroup: state.groupReducer.currentGroup,
        studentOfGroup: state.groupReducer.studentOfGroup,
        isRemarkGroup: state.groupReducer.isRemarkGroup,
        remarkGroupStudentIds: state.groupReducer.remarkGroupStudentIds
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
        },
        setCurrentGroup: (currentGroup) => {
            dispatch(groupActions.setCurrentGroup(currentGroup));
        },
        setStudentOfGroup: (studentOfGroup) => {
            dispatch(groupActions.setStudentOfGroup(studentOfGroup));
        },
        setIsRemarkGroup: (isRemarkGroup) => {
            dispatch(groupActions.setIsRemarkGroup(isRemarkGroup));
        },
        setRemarkGroupStudentIds: (remarkGroupStudentIds) => {
            dispatch(groupActions.setRemarkGroupStudentIds(remarkGroupStudentIds));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailList);

















