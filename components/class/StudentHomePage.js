import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PercentageCircle from 'react-native-percentage-circle';
import listData from "../../public/mockData/listData";
import PublicRefreshList from "../../public/components/PublicRefreshList";
import PublicNoContent from "../../public/components/PublicNoContent";
import PublicMask from "../../public/components/PublicMask";
import PublicSelectTime from "../../public/components/PublicSelectTime";
import { connect } from 'react-redux';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import * as studentActions from './Actions/studentAction';
import moment from 'moment';
import getProtocol from "../../public/utils/getProtocol";


class StudentHomePage extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            onlyMyRemark: false,
            selectTimeKey: 1,
            selectTimeName: '本周',
            dataArr: []
        }
    }
    componentDidMount() {
        // this.getList(1);
        this.fetchStudentRemark(1, false);
    }
    fetchStudentRemark = (time, filterTeacher) => {
        const { navigate } = this.props.navigation;
        const { currentStudent, setStudentRemarkInfo, setStudentRemarkList } = this.props;
        const { myChildId } = this.props.navigation.state.params;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/studentRemarkList',
                    {
                        studentId: myChildId ? myChildId : currentStudent.id,
                        time: time,
                        teacherId: filterTeacher ? value.id : 'null',
                    }
                ).then((val) => {
                    setStudentRemarkInfo(val.studentRemarkInfo);
                    setStudentRemarkList(val.studentRemarkList);
                });
            });
        }, navigate);
    };
    toGetRightComponent = () => {
        return(
            <Text style={styles.stuInfo}>学生资料</Text>
        )
    };
    toStudentDetailInfo = () => {
        const { navigate } = this.props.navigation;
        const { currentStudent } = this.props;
        const { handleStudentListModal, getStudentList } = this.props.navigation.state.params;
        navigate('StudentDetailInfo', {
            currentStudent,
            handleStudentListModal,
            getStudentList
        });
    };
    handleShowSelectTime = () => {
        this.setState({
            showSelectTime: !this.state.showSelectTime
        })
    };
    onlyMyRemarkFun = () => {
        const { selectTimeKey, onlyMyRemark} = this.state;
        this.setState({
            onlyMyRemark: !onlyMyRemark
        });
        this.fetchStudentRemark(selectTimeKey, !onlyMyRemark);
    };
    selectTimeFun = (id, name) => {
        this.setState({
            selectTimeKey: id,
            showSelectTime: false,
            selectTimeName: name
        });
        this.fetchStudentRemark(id, false);
    };
    //获取模拟数据
    getList = (page) => {
        switch (page) {
            case 1:
                this.setState({
                    dataArr: listData.studentRemarkList1
                });
                break;
            case 2:
                this.setState({
                    dataArr: listData.studentRemarkList1.concat(listData.studentRemarkList2)
                });
                break;
            case 3:
                this.setState({
                    dataArr: listData.studentRemarkList1.concat(listData.studentRemarkList2.concat(listData.studentRemarkList3))
                });
                break;

        }
    };
    getRenderStuRemark = () => {
        return({item}) => (
            <View style={styles.stuRemarkItem}>
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
        );
    };
    getHeaderComponent = (selectTimeName) => {
        const { studentRemarkInfo } = this.props;
        const { isParent } = this.props.navigation.state.params;
        return (
            <View>
                <View style={styles.scoreCharts}>
                    <PercentageCircle
                        radius={75}
                        percent={100}
                        color={"#3498db"}
                        borderWidth={9}
                    >
                        <Text style={{fontSize: 14}}>{selectTimeName}得{studentRemarkInfo.score}分</Text>
                    </PercentageCircle>
                    {
                        isParent === 1 ? null :
                            <TouchableOpacity style={styles.inviteParent}>
                                <Text style={styles.inviteParentText}>邀请家长</Text>
                            </TouchableOpacity>
                    }
                    <View style={styles.scoreContainer}>
                        <View style={[styles.scoreView, styles.leftScore]}>
                            <Text style={styles.scoreText}>+{studentRemarkInfo['praise_score']}分</Text>
                            <Text>表扬</Text>
                        </View>
                        <View style={styles.scoreView}>
                            <Text style={styles.scoreText}>{studentRemarkInfo['criticize_score']}分</Text>
                            <Text>批评</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tipsOfTimeWrapper}>
                    <View style={styles.listTipsOfTime}>
                        <Text>{selectTimeName}</Text>
                    </View>
                </View>
            </View>
        );
    };
    toLastPage = () => {
        const { navigation } = this.props;
        const { handleStudentListModal } = this.props.navigation.state.params;
        navigation.goBack();
        if (handleStudentListModal) {
            handleStudentListModal(false);
        }
    };
    render() {
        const { navigation, currentStudent, studentRemarkList } = this.props;
        const { showSelectTime, onlyMyRemark, selectTimeKey, selectTimeName, dataArr } = this.state;
        const { isMaster, isParent } = this.props.navigation.state.params;
        // const isMaster = 1;   //暂时注释
        return(
            <View style={{ position: 'relative' }}>
                <PublicHeader
                    title={currentStudent.name}
                    isLeft={true}
                    leftPressFun={this.toLastPage}
                    navigation={navigation}
                    isRight={true}
                    rightComponent={isMaster === 1 ? this.toGetRightComponent() : null}
                    rightPressFun={this.toStudentDetailInfo}
                />
                <View style={styles.homePageTop}>
                    <PublicSelectTime
                        selectTimeName={selectTimeName}
                        showSelectTime={showSelectTime}
                        handleShowSelectTime={this.handleShowSelectTime}
                        selectTimeKey={selectTimeKey}
                        selectTimeFun={this.selectTimeFun}
                        data={listData.selectTimeList}
                        top={27}
                        arrowRight={isParent === 1 ? 130 : ''}
                    />
                    {
                        isParent === 1 ?
                             null :
                            <TouchableOpacity
                                style={styles.homePageTopItem}
                                onPress={this.onlyMyRemarkFun}
                            >
                                <Text style={{ color: onlyMyRemark ? '#0f7cda' : 'black' }}>
                                    只看自己的点评
                                </Text>
                            </TouchableOpacity>
                    }
                </View>
                <PublicMask
                    isVisible={showSelectTime}
                    width={'100%'}
                    height={Dimensions.get('window').height - 104}
                    top={104}
                />

                {
                    (studentRemarkList.length !== 0) ?
                        <View style={styles.stuRemarkListContainer}>
                            <PublicRefreshList
                                dataArr={studentRemarkList}
                                getRenderItem={this.getRenderStuRemark}
                                getList={this.getList}
                                totalPage={3}
                                ListHeaderComponent={this.getHeaderComponent(selectTimeName)}
                            />
                        </View> :
                        <PublicNoContent tips="暂无点评记录" />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stuInfo: {
        color: '#fff'
    },
    homePageTop: {
        height: 40,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    homePageTopItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scoreCharts: {
        alignItems: 'center',
        // marginTop: 3,
        paddingTop: 40,
        height: 290,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 10
    },
    maskContainer: {
        width: '100%',
        height: Dimensions.get('window').height - 105,
        position: 'absolute',
        zIndex: 10,
        top: 104,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    maskHiddenContainer: {
        display: 'none'
    },
    scoreContainer: {
        height: 30,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    scoreView: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftScore: {
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'gray',
    },
    scoreText: {
        fontSize: 20,
        color: '#3498db',
        marginBottom: 10
    },
    stuRemarkListContainer: {
        paddingTop: 8,
        paddingBottom: 120
    },
    tipsOfTimeWrapper: {
        paddingLeft: 10,
        backgroundColor: '#fff',
        height: 30,
        justifyContent: 'center',
        paddingTop: 10
    },
    listTipsOfTime: {
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderLeftColor: '#3498db',
        paddingLeft: 8,
        backgroundColor: '#fff',
    },
    stuRemarkItem: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        backgroundColor: '#fff',
        paddingLeft: 10
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
    inviteParent: {
        position: 'absolute',
        top: 15,
        right: 0,
        backgroundColor: '#3498db',
        height: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    inviteParentText: {
        fontSize: 12,
        color: '#fff'
    }
});

const mapStateToProps = (state) => {
    return {
        currentStudent: state.studentReducer.currentStudent,
        studentRemarkInfo: state.studentReducer.studentRemarkInfo,
        studentRemarkList: state.studentReducer.studentRemarkList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStudentRemarkInfo: (studentRemarkInfo) => {
            dispatch(studentActions.setStudentRemarkInfo(studentRemarkInfo));
        },
        setStudentRemarkList: (studentRemarkList) => {
            dispatch(studentActions.setStudentRemarkList(studentRemarkList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentHomePage);