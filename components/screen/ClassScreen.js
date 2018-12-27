import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import PublicRefreshList from "../../public/components/PublicRefreshList";
import PublicMask from "../../public/components/PublicMask";
import fetchData from "../../public/utils/fetchData";
import { checkUser, getTokenInfo } from '../../public/utils/checkUser';
import * as classActions from '../class/Actions/classAction';
import PublicImageItem from "../../public/components/PublicImageItem";
import moment from "moment/moment";
import getProtocol from '../../public/utils/getProtocol';
import PublicBtn from "../../public/components/PublicBtn";
import {isIphonePlus, isIphoneX} from "../../public/utils/getDevice";

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
    constructor(props) {
        super(props);
        this.state = {
            selectKey: 0,
            showManageClassBtn: false,
            isDeleteClass: false,
            selectClassId: -1,
            isFetch: false,
            isTeacher: false,
            selectIdentity: 0,  //0是老师，1是家长
            shouldJoinClass: true,
            waitMasterCheck: false
        };
    }
    componentDidMount() {
        //这边把老师和家长区分
        const { navigation } = this.props;
        getTokenInfo().then((value) => {
            this.setState({
                selectIdentity: value.selectIdentity
            });
            if (value.selectIdentity === 0) {   //老师
                this.getClassList(0);
                navigation.setParams({
                    onChangeselectKey: this.onChangeselectKey,
                    getChildInfo: this.getChildInfo
                });
            }else {
                this.getChildInfo();
                navigation.setParams({
                    getChildInfo: this.getChildInfo,
                    onChangeselectKey: this.onChangeselectKey
                });
            }
        });
    }
    static getDerivedStateFromProps(preProps, preState) {
        if (preProps.navigation.state.params && (preState.isTeacher !== preProps.navigation.state.params.isTeacher)) {
            return {
                isTeacher: preProps.navigation.state.params.isTeacher
            }
        }
        if (preProps.navigation.state.params && (preState.selectIdentity !== preProps.navigation.state.params.selectIdentity)) {
            return {
                selectIdentity: preProps.navigation.state.params.selectIdentity ? preProps.navigation.state.params.selectIdentity : preState.selectIdentity
            };
        }
        return null;
    }
    getChildInfo = () => {
        const { navigate } = this.props.navigation;
        const { setChildInfo, setLatestRemark, setLatestCheck } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/childInfo',
                    {
                        parentId: value.selectIdentity === 1 ? value.id : '',
                        selectIdentity: value.selectIdentity
                    }
                ).then((val) => {
                    setChildInfo(val.personInfo.childInfo ? val.personInfo.childInfo : '');
                    setLatestRemark((val.personInfo.remark && val.personInfo.remark.length) > 0 ? val.personInfo.remark : []);
                    setLatestCheck((val.personInfo.check && val.personInfo.check.length > 0) ? val.personInfo.check : []);
                    this.setState({
                        waitMasterCheck: val.personInfo.waitMasterCheck,
                        shouldJoinClass: val.personInfo.shouldJoinClass
                    })
                });
            });
        }, navigate);
    };
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
    onChangeselectKey = (key) => {
        const { isDeleteClass } = this.state;
        if (!isDeleteClass) {
            this.setState({
                selectKey: key,
            });
            this.getClassList(key)
        }
    };
    getClassDetail = (id, grade, name, isMaster, imgUrl) => {
        const { navigate } = this.props.navigation;
        const { setCurrentClassId } = this.props;
        navigate('ClassDetailList', { grade, name, isMaster, imgUrl });
        setCurrentClassId(id);
    };
    touchClass = (item) => {
        const { selectKey, isDeleteClass } = this.state;
        if(isDeleteClass) {
            this.selectClass(item.id);
        }else {
            this.getClassDetail(item.id, item.grade, item.name, selectKey, item['img_url'])
        }
    };
    getRenderItem = () => {
        const { isDeleteClass, selectClassId, selectKey } = this.state;
        return({item}) => {
            return(
                <TouchableOpacity
                    onPress={() => this.touchClass(item)}
                    activeOpacity={isDeleteClass ? 0.5 : 1}
                >
                    <View style={styles.mainItem}>
                        {
                            isDeleteClass && selectKey === 1 ?
                                <View style={styles.checkClass}>
                                    <Icon
                                        name="check-circle"
                                        color={selectClassId === item.id ? '#3498db': 'gray'}
                                    />
                                </View> : null
                        }
                        <Image
                            source={{uri: getProtocol() + item['img_url']}}
                            style={styles.mainImg}
                        />
                        <View style={styles.mainText}>
                            <Text>{item.grade}{item.name}</Text>
                            <Text style={styles.stu}>{item['student_count']}个学生</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        };
    };
    getRightComponent = () => {
        const { isDeleteClass, selectClassId } = this.state;
        return(
            <View>
                {
                    !isDeleteClass ?
                        <Icon
                            name="add"
                            color="#fff"
                        /> :
                        <Text style={{ color: '#fff' }}>{selectClassId === -1 ? '取消' : '完成'}</Text>
                }
            </View>
        )
    };
    handleShowManageClass = () => {
        this.setState({
            showManageClassBtn: !this.state.showManageClassBtn
        })
    };
    toCreateClass = () => {
        const { navigate } = this.props.navigation;
        const { selectKey } = this.state;
        this.setState({
            showManageClassBtn: false,
        });
        if (selectKey === 0) {
            alert('当前您为任课老师，不能创建班级，请切换至班主任');
        }else {
            checkUser(() => {
                getTokenInfo().then((value) => {
                    fetchData.postData('/checkMasterClass',
                        {
                            teacherId: value.id,
                        }
                    ).then((val) => {
                        if(val.hasMasterClass){
                            alert('您已经有创建的班级了')
                        }else {
                            navigate('CreateClass', {
                                getClassList: this.getClassList
                            });
                        }
                    });
                });
            }, navigate);
        }
    };
    toDeleteClass = () => {
        const { selectKey } = this.state;
        const { classList } = this.props;
        if (selectKey === 0) {
            alert('当前您为任课老师，不能删除班级，请切换至班主任');
            this.setState({
                showManageClassBtn: false,
            })
        } else {
            if (classList.length === 0) {
                this.setState({
                    showManageClassBtn: false,
                });
                alert('未创建班级');
            } else {
                this.setState({
                    showManageClassBtn: false,
                    isDeleteClass: true
                });
            }
        }
    };
    selectClass = (id) => {
        const { selectClassId } = this.state;
        if (selectClassId === -1) {
            this.setState({
                selectClassId: id
            })
        }else {
            this.setState({
                selectClassId: -1
            })
        }
    };
    toPostDeleteClass = () => {
        //发删除班级请求
        const { selectClassId } = this.state;
        const { navigate } = this.props.navigation;
        if (selectClassId === -1) {
            alert('请先选择班级');
        } else {
            checkUser(() => {
                fetchData.postData('/deleteClass',
                    {
                        classId: selectClassId
                    }
                ).then((val) => {
                    if(val.deleteClassSuccess){
                        this.getClassList(1);
                        alert('删除成功')
                    }else {
                        alert('删除失败')
                    }
                });
            }, navigate);
        }
        this.setState({
            isDeleteClass: false,
        });
    };
    toGetChildRemark = () => {
        const { navigate } = this.props.navigation;
        const { childInfo } = this.props;
        navigate('StudentHomePage', {
            isMaster: 0,
            isParent: 1,
            myChildId: childInfo.id,
            myChildName: childInfo.name
        });
    };
    toGetCheck = () => {
        const { navigate } = this.props.navigation;
        const { childInfo } = this.props;
        navigate('CheckStudentDetail', {
            isParent: 1,
            studentId: childInfo.id,
            myChildName: childInfo.name
        });
    };
    toJoinClass = () => {
        const { navigate } = this.props.navigation;
        navigate('JoinClass', {
            getChildInfo: this.getChildInfo
        });
    };
    cancelDeleteClass = () => {
        this.setState({
            isDeleteClass: false,
        });
    };
    render() {
        const { selectKey, showManageClassBtn, isDeleteClass, selectIdentity, shouldJoinClass, selectClassId } = this.state;
        const { classList, navigation, childInfo, latestRemark, latestCheck } = this.props;
        return(
            <View style={{ position: 'relative' }}>
                <PublicMask
                    isVisible={showManageClassBtn}
                    handleModal={this.handleShowManageClass}
                    width={'100%'}
                    height={Dimensions.get('window').height}
                    backgroundColor="rgba(0, 0, 0, 0.1)"
                />
                <PublicHeader
                    title="课堂"
                    isRight={true}
                    rightComponent={(selectIdentity === 0 && selectKey === 1) ? this.getRightComponent() : null}
                    navigation={navigation}
                    rightPressFun={isDeleteClass ? (selectClassId === -1 ? this.cancelDeleteClass : this.toPostDeleteClass) : this.handleShowManageClass}
                />
                <View style={showManageClassBtn ? styles.manageClass : styles.hidden}>
                    <View style={styles.triangleView}>
                    </View>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.toCreateClass}
                    >
                        <Text>创建班级</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.manageClassItem}
                        onPress={this.toDeleteClass}
                    >
                        <Text>删除班级</Text>
                    </TouchableOpacity>
                </View>
                {
                    selectIdentity === 0 ?
                        <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeselectKey} />
                        : null
                }
                {
                    selectIdentity === 0 ?    //老师端
                        (selectKey === 1 ?
                            <View style={styles.main}>
                                <PublicRefreshList
                                    getRenderItem={this.getRenderItem}
                                    dataArr={classList}
                                    totalPage={0}
                                    ListEmptyComponent={<PublicNoContent tips="暂无创建的班级" />}
                                />
                            </View> :
                            <View style={styles.main}>
                                <PublicRefreshList
                                    getRenderItem={this.getRenderItem}
                                    dataArr={classList}
                                    totalPage={0}
                                    ListEmptyComponent={<PublicNoContent tips="暂无管理的班级" />}
                                />
                            </View>) :
                            (
                            <View>
                                {
                                    childInfo ?
                                        (
                                            <View style={styles.childContainer}>
                                                <View style={styles.childInfo}>
                                                    <Image
                                                        source={{uri: getProtocol() + childInfo['avatar_url']}}
                                                        style={styles.childImg}
                                                    />
                                                    <View>
                                                        <Text style={styles.childName}>
                                                            {childInfo.name}
                                                        </Text>
                                                        <Text>
                                                            {childInfo['class_grade']}{childInfo['class_name']}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.childScore}>
                                                        本周得分{childInfo.score}分
                                                    </Text>
                                                </View>
                                                <View style={styles.childRemarkContainer}>
                                                    <Text style={styles.childTips}>最近表现</Text>
                                                    <View style={styles.childRemark}>
                                                        {
                                                            latestRemark && latestRemark.length === 0 ? null :
                                                                <TouchableOpacity
                                                                    style={styles.moreContainer}
                                                                    onPress={this.toGetChildRemark}
                                                                >
                                                                    <Text style={styles.more}>更多</Text>
                                                                </TouchableOpacity>

                                                        }
                                                        {
                                                            latestRemark && latestRemark.length === 0 ? <Text>本周暂无点评记录</Text> : (latestRemark.length > 0 ? latestRemark.map((item) => {
                                                                return(
                                                                    <View style={styles.stuRemarkItem} key={item.id}>
                                                                        <Image
                                                                            source={{uri: getProtocol() + item['img_url']}}
                                                                            style={styles.stuRemarkImg}
                                                                        />
                                                                        <View>
                                                                            <View style={[styles.rightTips, styles.topScore]}>
                                                                                <Text style={styles.rightScore}>{item.score === null ? '无分数' : item['is_praise'] === '0' ? ('+' + item.score + '分'): ('-' + item.score + '分')}</Text>
                                                                                <Text>因为 {item['group_name']} {item['project_name'] === null ? '自定义点评' : item['project_name']} {item['template_name']}</Text>
                                                                            </View>
                                                                            <View style={styles.rightTips}>
                                                                                <Text style={[styles.bottomText, styles.bottomLeftText]}>{moment(item['create_time']).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                                                                <Text style={styles.bottomText}>由{item['teacher_name']}老师点评</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            }) :  <Text>本周暂无点评记录</Text>)
                                                        }

                                                    </View>
                                                </View>
                                                <View style={styles.childRemarkContainer}>
                                                    <Text style={styles.childTips}>最近考勤</Text>
                                                    <View style={styles.childRemark}>
                                                        {
                                                            latestCheck && latestCheck.length === 0 ? null :
                                                                <TouchableOpacity
                                                                    style={styles.moreContainer}
                                                                    onPress={this.toGetCheck}
                                                                >
                                                                    <Text style={styles.more}>更多</Text>
                                                                </TouchableOpacity>
                                                        }
                                                        {
                                                            latestCheck && latestCheck.length === 0 ? <Text>本周暂无考勤记录</Text> :
                                                                <PublicImageItem
                                                                    isShowSelectRightName={true}
                                                                    selectRightFrontName='本周全勤'
                                                                    selectRightEndName='次'
                                                                    selectRightKey='state_count'
                                                                    data={latestCheck}
                                                                />
                                                        }
                                                    </View>
                                                </View>
                                            </View>

                                        ) :
                                        <View>
                                            <PublicNoContent tips={`${shouldJoinClass ? '暂未加入班级' : '等待班主任通过'}`} />
                                            {
                                                shouldJoinClass ?
                                                    <PublicBtn
                                                        tips="加入班级"
                                                        onPress={this.toJoinClass}
                                                    /> : null
                                            }
                                        </View>
                                }
                            </View>
                            )
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
    manageClass: {
        width: 150,
        height: 80,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        position: 'absolute',
        right: 5,
        top: isIphoneX() ? 90 : 70,
        zIndex: 20
    },
    manageClassItem: {
        display: 'flex',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    triangleView: {
        width: 15,
        height: 15,
        backgroundColor: '#fff',
        position: 'absolute',
        right: 10,
        top: -5,
        transform: [{ rotate:'45deg' }],
    },
    hidden: {
        display: 'none'
    },
    checkClass: {
        marginRight: 10
    },
    childContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    childImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 15
    },
    childInfo: {
        width: isIphonePlus() ? 370 : 340,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    childName: {
        marginBottom: 10
    },
    childScore: {
        position: 'absolute',
        right: 15
    },
    childRemark: {
        width: isIphonePlus() ? 370 : 340,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center'
    },
    childRemarkContainer: {
        marginTop: 10
    },
    childTips: {
        marginBottom: 10
    },
    more: {
        color: 'gray',
        fontSize: 12
    },
    moreContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },

    stuRemarkItem: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        marginLeft: -36
    },
    stuRemarkImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    rightTips: {
        flexDirection: 'row',
    },
    topScore: {
        marginBottom: 8
    },
    rightScore: {
        color: '#3498db',
        marginRight: 10
    },
    bottomText: {
        fontSize: 12,
        color: 'gray'
    },
    bottomLeftText: {
        marginRight: 10
    },
});
const mapStateToProps = (state) => {
    return {
        classList: state.classReducer.classList,
        childInfo: state.classReducer.childInfo,
        latestRemark: state.classReducer.latestRemark,
        latestCheck: state.classReducer.latestCheck
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClassList: (classList) => {
            dispatch(classActions.setClassList(classList));
        },
        setCurrentClassId: (currentClassId) => {
            dispatch(classActions.setCurrentClassId(currentClassId));
        },
        setChildInfo: (childInfo) => {
            dispatch(classActions.setChildInfo(childInfo));
        },
        setLatestRemark: (latestRemark) => {
            dispatch(classActions.setLatestRemark(latestRemark));
        },
        setLatestCheck: (latestCheck) => {
            dispatch(classActions.setLatestCheck(latestCheck));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen);