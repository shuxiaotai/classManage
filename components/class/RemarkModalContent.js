import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import { connect } from 'react-redux';
import PublicTab from "../../public/components/PublicTab";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import PublicScrollView from "../../public/components/PublicScrollView";
import PublicBtn from "../../public/components/PublicBtn";
import * as templateActions from './Actions/templateAction';
import * as projectActions from './Actions/projectAction';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import PublicNoContent from "../../public/components/PublicNoContent";
import getProtocol from "../../public/utils/getProtocol";

const tabItem = [
    {
        name: '表扬',
        key: 0,
    }, {
        name: '待改进',
        key: 1,
    }, {
        name: '自定义点评',
        key: 2,
    }
];
class RemarkModalContent extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 0,   //0是表扬，1是批评，2是自定义
            showSelectCourse: false,
            projectId: -1,
            templateId: -1,
            customRemark: ''
        }
    }
    componentDidMount() {
        const { isMaster } = this.props;   //0是任课老师，1是班主任
        this.getPraiseTemplateList();
        if (isMaster === 0) {
            this.getCourseList();
        } else {
            this.getScheduleList();
        }
    }
    getPraiseTemplateList = () => {   //表扬模板
        const { navigate } = this.props.navigation;
        const { currentClassId, setPraiseTemplateList } = this.props;
        checkUser(() => {
            fetchData.postData('/praiseTemplateList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setPraiseTemplateList(val.praiseTemplateList);
            });
        }, navigate);
    };
    getCriticizeTemplateList = () => {   //批评模板
        const { navigate } = this.props.navigation;
        const { currentClassId, setCriticizeTemplateList } = this.props;
        checkUser(() => {
            fetchData.postData('/criticizeTemplateList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setCriticizeTemplateList(val.criticizeTemplateList);
            });
        }, navigate);
    };
    onChangeSelectKey = (key) => {    //表扬，批评，自定义切换
        this.setState({
            selectKey: key
        });
        if (key === 0) {
            this.getPraiseTemplateList();
        }else if(key === 1) {
            this.getCriticizeTemplateList();
        }
    };
    remarkTips = (isPraise, id) => {   //点评
        const { navigate } = this.props.navigation;
        const { projectId, selectKey } = this.state;
        const { isMaster, currentStudent, handleStudentAndGroupListModal, isRemarkGroup, currentGroup, remarkGroupStudentIds, getStudentList, getGroupList } = this.props;
        if (projectId === -1) {
            let projectTips = isMaster === 0 ? '请先选择课程' : '请先选择项目';
            alert(projectTips);
        }else {
            this.setState({
                templateId: id
            });
            checkUser(() => {
                getTokenInfo().then((value) => {
                    fetchData.postData('/addRemark',
                        {
                            teacherId: value.id,
                            templateId: id,
                            projectId: projectId,
                            studentIds: isRemarkGroup ? remarkGroupStudentIds : currentStudent.id,
                            groupId: isRemarkGroup ? currentGroup.id : 0
                        }
                    ).then((val) => {
                        if (val.addRemarkSuccess) {
                            Alert.alert(
                                'Alert',
                                `${selectKey === 0 ? '表扬成功' : '批评成功'}`,
                                [
                                    {text: 'OK', onPress: () => {
                                            if(isRemarkGroup) {
                                                getGroupList()    //刷新小组列表
                                            }else {
                                                getStudentList();   //刷新学生列表
                                            }
                                            handleStudentAndGroupListModal(false);
                                    }},
                                ],
                                { cancelable: false }
                            );
                        }else {
                            alert(selectKey === 0 ? '表扬失败' : '批评失败');
                        }
                    });
                });
            }, navigate);
        }
    };
    renderRemarkList = (isPraise) => {   //渲染点评模板列表
        const { praiseTemplateList, criticizeTemplateList } = this.props;
        let list = isPraise ? praiseTemplateList : criticizeTemplateList;
        let tips = isPraise ? '该班级暂无表扬模板，请联系管理员开通' : '该班级暂无批评模板，请联系管理员开通';
        return(
            <View style={styles.remarkContainer}>
                {
                    list.length !== 0 ? list.map((item) => {
                        return(
                            <TouchableOpacity
                                style={styles.remarkItem}
                                key={item.id}
                                onPress={() => this.remarkTips(isPraise, item.id)}
                            >
                                <View style={isPraise ? styles.scorePraiseView : styles.scoreCriticizeView}>
                                    <Text style={styles.scoreText}>{isPraise ? `+${item.score}` : `-${item.score}`}</Text>
                                </View>
                                <Image
                                    source={{uri: getProtocol() + item['img_url']}}
                                    style={styles.remarkImg}
                                />
                                <Text style={styles.remark}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }) :
                        <View style={styles.noCourse}>
                            <PublicNoContent tips={tips} />
                        </View>

                }
            </View>
        )
    };
    getCourse = (key) => {   //选择项目或课程
        this.setState({
            showSelectCourse: false,
            projectId: key,
        })
    };
    renderCourse = () => {   //渲染日程项目或课程
        const { isMaster, courseList, scheduleList } = this.props;   //0是任课老师，1是班主任
        let list = isMaster === 0 ? courseList : scheduleList;
        let tips = isMaster === 0 ? '该班级暂无课程选择，请联系管理员开通' : '该班级暂无项目选择，请联系管理员开通';
        return(
            <View style={styles.courseContainer}>
                {
                    list.length !== 0 ? list.map((item) => {
                        return(
                            <PublicCircleItem
                                item={item}
                                pressFun={() => this.getCourse(item.id)}
                                key={item.id}
                            />
                        )
                    }) :
                        <View style={styles.noCourse}>
                            <PublicNoContent tips={tips} />
                        </View>
                }
            </View>
        )
    };
    changeSelectedProject = () => {   //是否显示项目
        this.setState({
            showSelectCourse: !this.state.showSelectCourse
        });
    };
    getScheduleList = () => {   //获取日程项目请求
        const { navigate } = this.props.navigation;
        const { currentClassId, setScheduleList } = this.props;
        checkUser(() => {
            fetchData.postData('/scheduleList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setScheduleList(val.scheduleList);
            });
        }, navigate);
    };
    getCourseList = () => {   //获取课程列表请求
        const { navigate } = this.props.navigation;
        const { currentClassId, setCourseList } = this.props;
        checkUser(() => {
            fetchData.postData('/courseList',
                {
                    currentClassId: currentClassId,
                }
            ).then((val) => {
                setCourseList(val.courseList);
            });
        }, navigate);
    };
    publishCustomRemark = () => {   //发布自定义点评
        const { navigate } = this.props.navigation;
        const { customRemark } = this.state;
        const { currentStudent, isRemarkGroup, currentGroup, remarkGroupStudentIds, handleStudentAndGroupListModal } = this.props;
        if (customRemark === '') {
            alert('自定义点评内容不能为空');
        } else {
            checkUser(() => {
                getTokenInfo().then((value) => {
                    fetchData.postData('/addCustomRemark',
                        {
                            teacherId: value.id,
                            studentIds: isRemarkGroup ? remarkGroupStudentIds : currentStudent.id,
                            customRemark: customRemark,
                            groupId: isRemarkGroup ? currentGroup.id : 0
                        }
                    ).then((val) => {
                        if (val.addCustomRemarkSuccess) {
                            Alert.alert(
                                'Alert',
                                `点评成功`,
                                [
                                    {text: 'OK', onPress: () => {
                                            handleStudentAndGroupListModal(false)
                                        }},
                                ],
                                { cancelable: false }
                            );
                        }else {
                            alert('点评失败');
                        }
                    });
                });
            }, navigate);
        }
    };
    render() {
        const { selectKey, showSelectCourse } = this.state;
        const { isMaster } = this.props;
        return(
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.changeSelectedProject}>
                    <Text style={styles.selectCourse}>
                        {
                            selectKey === 2 ? null : (isMaster === 0  ? (showSelectCourse ? '已显示课程列表': '选择课程') : (showSelectCourse ? '已显示项目列表': '选择项目'))
                        }

                    </Text>
                </TouchableOpacity>
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 0 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={80}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(true)}
                                setMarginBottom={80}
                            />
                        )
                        : null
                }
                {
                    selectKey === 1 ?
                        ( showSelectCourse ?
                            <PublicScrollView
                                renderView={this.renderCourse()}
                                setMarginBottom={80}
                            /> :
                            <PublicScrollView
                                renderView={this.renderRemarkList(false)}
                                setMarginBottom={80}
                            />
                        )
                        : null
                }
                {
                    selectKey === 2 ?
                        <View>
                            <TextInput
                                placeholder="请输入您的点评"
                                style={styles.customInput}
                                multiline={true}
                                onChangeText={(customRemark) => this.setState({customRemark})}
                            />
                            <PublicBtn tips="确认点评" onPress={this.publishCustomRemark} />
                        </View>
                        : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    remarkContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginTop: 5,
        height: 500,
    },
    remarkItem: {
        display: 'flex',
        width: 89,
        alignItems: 'center',
        marginBottom: 8
    },
    remarkImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    remark: {
        marginTop: 8
    },
    scorePraiseView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0f7cda',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 15,
        right: -20,
        zIndex: 10,
    },
    scoreText: {
        color: '#fff',
        fontSize: 13
    },
    modalContainer: {
        width: 300,
        height: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        zIndex: 100,
        position: 'absolute'
    },
    scoreCriticizeView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'skyblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 15,
        right: -20,
        zIndex: 10,
    },
    selectCourse: {
        color: '#0f7cda',
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 2
    },
    courseContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginTop: 10,
        height: 340,
    },
    customInput: {
        height: 100,
        marginTop: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#f1f1f1',
        marginHorizontal: 15
    },
    noCourse: {
        width: '100%',
        height: 300,
        marginLeft: -10,
        marginTop: -20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        praiseTemplateList: state.templateReducer.praiseTemplateList,
        criticizeTemplateList: state.templateReducer.criticizeTemplateList,
        currentClassId: state.classReducer.currentClassId,
        scheduleList: state.projectReducer.scheduleList,
        courseList: state.projectReducer.courseList,
        currentStudent: state.studentReducer.currentStudent
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPraiseTemplateList: (praiseTemplateList) => {
            dispatch(templateActions.setPraiseTemplateList(praiseTemplateList));
        },
        setCriticizeTemplateList: (criticizeTemplateList) => {
            dispatch(templateActions.setCriticizeTemplateList(criticizeTemplateList));
        },
        setScheduleList: (scheduleList) => {
            dispatch(projectActions.setScheduleList(scheduleList));
        },
        setCourseList: (courseList) => {
            dispatch(projectActions.setCourseList(courseList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RemarkModalContent);