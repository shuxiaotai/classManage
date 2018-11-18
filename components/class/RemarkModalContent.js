import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PublicTab from "../../public/components/PublicTab";
import PublicCircleItem from "../../public/components/PublicCircleItem";
import PublicScrollView from "../../public/components/PublicScrollView";
import listData from "../../public/mockData/listData";
import PublicBtn from "../../public/components/PublicBtn";
import * as templateActions from './Actions/templateAction';
import * as projectActions from './Actions/projectAction';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";

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
            showSelectCourse: false
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
    getPraiseTemplateList = () => {
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
    getCriticizeTemplateList = () => {
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
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        });
        if (key === 0) {
            this.getPraiseTemplateList();
        }else if(key === 1) {
            this.getCriticizeTemplateList();
        }
    };
    remarkTips = (isPraise) => {
        let tips = isPraise ? '表扬成功' : '批评成功';
        alert(tips);
    };
    renderRemarkList = (isPraise) => {
        const { praiseTemplateList, criticizeTemplateList } = this.props;
        let list = isPraise ? praiseTemplateList : criticizeTemplateList;
        return(
            <View style={styles.remarkContainer}>
                {
                    list.map((item) => {
                        return(
                            <TouchableOpacity
                                style={styles.remarkItem}
                                key={item.id}
                                onPress={() => this.remarkTips(isPraise)}
                            >
                                <View style={isPraise ? styles.scorePraiseView : styles.scoreCriticizeView}>
                                    <Text style={styles.scoreText}>{isPraise ? `+${item.score}` : `-${item.score}`}</Text>
                                </View>
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.remarkImg}
                                />
                                <Text style={styles.remark}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    };
    getCourse = (key) => {
        this.setState({
            showSelectCourse: false
        })
    };
    renderCourse = () => {
        const { isMaster, courseList, scheduleList } = this.props;   //0是任课老师，1是班主任
        let list = isMaster === 0 ? courseList : scheduleList;
        return(
            <View style={styles.courseContainer}>
                {
                    list.map((item) => {
                        return(
                            <PublicCircleItem
                                item={item}
                                pressFun={this.getCourse}
                                key={item.id}
                            />
                        )
                    })
                }
            </View>
        )
    };
    changeSelectedProject = () => {
        this.setState({
            showSelectCourse: true
        });
    };
    getScheduleList = () => {
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
    getCourseList = () => {
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
    render() {
        const { selectKey, showSelectCourse } = this.state;
        const { isMaster } = this.props;
        return(
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.changeSelectedProject}>
                    <Text style={styles.selectCourse}>{isMaster === 0  ? '选择课程' : '选择项目'}</Text>
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
                            />
                            <PublicBtn tips="确认点评" />
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
    }
});

const mapStateToProps = (state) => {
    return {
        praiseTemplateList: state.templateReducer.praiseTemplateList,
        criticizeTemplateList: state.templateReducer.criticizeTemplateList,
        currentClassId: state.classReducer.currentClassId,
        scheduleList: state.projectReducer.scheduleList,
        courseList: state.projectReducer.courseList
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