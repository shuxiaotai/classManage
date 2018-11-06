import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PercentageCircle from 'react-native-percentage-circle';
import listData from "../../public/mockData/listData";
import PublicRefreshList from "../../public/components/PublicRefreshList";
import PublicNoContent from "../../public/components/PublicNoContent";

class StudentHomePage extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            onlyMyRemark: false,
            selectTimeKey: 2,
            selectTimeName: '本周',
            dataArr: []
        }
    }
    componentDidMount() {
        this.getList(1);
    }
    toGetRightComponent = () => {
        return(
            <Text style={styles.stuInfo}>学生资料</Text>
        )
    };
    toStudentDetailInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('StudentDetailInfo');
    };
    handleShowSelectTime = () => {
        this.setState({
            showSelectTime: !this.state.showSelectTime
        })
    };
    onlyMyRemarkFun = () => {
        this.setState({
            onlyMyRemark: !this.state.onlyMyRemark
        })
    };
    selectTimeFun = (key, timeName) => {
        this.setState({
            selectTimeKey: key,
            showSelectTime: false,
            selectTimeName: timeName
        })
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
                    source={require('../../public/img/test.png')}
                    style={styles.stuRemarkImg}
                />
                <View>
                    <View style={[styles.rightTips, styles.topScore]}>
                        <Text style={styles.rightScore}>{item.isPraise === 0 ? '+' : '-'}{item.score}分</Text>
                        <Text>因为{item.isPerson === 0 ? '个人' : `${item.groupName}`}{item.projectName}</Text>
                    </View>
                    <View style={styles.rightTips}>
                        <Text style={[styles.bottomText, styles.bottomLeftText]}>{item.time}</Text>
                        <Text style={styles.bottomText}>由{item.teacher}老师点评</Text>
                    </View>
                </View>
            </View>
        );
    };
    getHeaderComponent = () => (
        <View>
            <View style={styles.scoreCharts}>
                <PercentageCircle
                    radius={75}
                    percent={100}
                    color={"#3498db"}
                    borderWidth={9}
                >
                    <Text style={{fontSize: 14}}>{this.state.selectTimeName}得1分</Text>
                </PercentageCircle>
                <TouchableOpacity style={styles.inviteParent}>
                    <Text style={styles.inviteParentText}>邀请家长</Text>
                </TouchableOpacity>
                <View style={styles.scoreContainer}>
                    <View style={[styles.scoreView, styles.leftScore]}>
                        <Text style={styles.scoreText}>+1分</Text>
                        <Text>表扬</Text>
                    </View>
                    <View style={styles.scoreView}>
                        <Text style={styles.scoreText}>-1分</Text>
                        <Text>批评</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tipsOfTimeWrapper}>
                <View style={styles.listTipsOfTime}>
                    <Text>{this.state.selectTimeName}</Text>
                </View>
            </View>
        </View>
    );
    render() {
        const { navigation } = this.props;
        const { showSelectTime, onlyMyRemark, selectTimeKey, selectTimeName, dataArr } = this.state;
        return(
            <View style={{ position: 'relative' }}>
                <PublicHeader
                    title="舒小的主页"
                    isLeft={true} navigation={navigation}
                    isRight={true}
                    rightComponent={this.toGetRightComponent()}
                    rightPressFun={this.toStudentDetailInfo}
                />
                <View style={styles.homePageTop}>
                    <TouchableOpacity
                        style={[styles.homePageTopItem, styles.leftTopItem]}
                        onPress={this.handleShowSelectTime}
                        activeOpacity={1}
                    >
                        <Text>
                            {selectTimeName}
                        </Text>
                        <View style={{ position: 'absolute', right: 50 }}>
                            <Icon
                                name={showSelectTime ? 'expand-less' : 'expand-more'}   //expand-less, 'expand-more'
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.homePageTopItem}
                        onPress={this.onlyMyRemarkFun}
                    >
                        <Text style={{ color: onlyMyRemark ? '#0f7cda' : 'black' }}>
                            只看自己的点评
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={showSelectTime ? styles.maskContainer : styles.maskHiddenContainer}>
                </View>
                <View style={showSelectTime ? styles.selectContainer : styles.selectHiddenContainer}>
                    {
                        listData.selectTimeList.map((item) => {
                            return(
                                <TouchableOpacity
                                    style={styles.selectItem}
                                    key={item.key}
                                    onPress={() => this.selectTimeFun(item.key, item.timeName)}
                                >
                                    <Text style={{ color: selectTimeKey === item.key ? '#0f7cda' : 'black' }}>{item.timeName}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                {
                    (dataArr.length !== 0) ?
                        <View style={styles.stuRemarkListContainer}>
                            <PublicRefreshList
                                dataArr={dataArr}
                                getRenderItem={this.getRenderStuRemark}
                                getList={this.getList}
                                totalPage={3}
                                ListHeaderComponent={this.getHeaderComponent}
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
        justifyContent: 'center'
    },
    homePageTopItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftTopItem: {
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: 'gray',
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
    selectContainer: {
        width: '50%',
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        top: 103,
        zIndex: 100
    },
    selectHiddenContainer: {
        display: 'none'
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
    selectItem: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
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
        // backgroundColor: '#fff',
        // marginTop: 10,
        // paddingLeft: 10,
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
export default StudentHomePage;