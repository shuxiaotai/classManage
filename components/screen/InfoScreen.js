import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import PublicNoContent from "../../public/components/PublicNoContent";
import listData from "../../public/mockData/listData";
import Rate from "../info/Rate";
import SelectVisibleClass from "../info/SelectVisibleClass";
import { connect } from 'react-redux';
import * as infoActions from '../info/Actions/infoAction';
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import moment from "moment/moment";
import getProtocol from "../../public/utils/getProtocol";

const tabItem = [
    {
        name: '全部',
        key: 1,
    }, {
        name: '公告',
        key: 2,
    }, {
        name: '作业',
        key: 3,
    }, {
        name: '光荣榜',
        key: 4,
    }
];

class InfoScreen extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1,
            selectIdentity: -1,
            teacherId: -1,
            showDeleteBtn: false,
            currentInfoId: '',
            currentSelectClassId: '',
            isFresh: false
        }
    }
    componentDidMount() {
        getTokenInfo().then((value) => {
            this.setState({
                selectIdentity: value.selectIdentity,
                teacherId: value.id
            });
        });
        this.fetchAllInfoList();
        const { navigation } = this.props;
        navigation.setParams({
            onChangeSelectKey: this.onChangeSelectKey,
            isFresh: this.state.isFresh
        });
    }
    static getDerivedStateFromProps(preProps, preState) {
        if (preProps.navigation.state.params && (preState.isFresh !== preProps.navigation.state.params.isFresh)) {
            return {
                isFresh: preProps.navigation.state.params.isFresh,
                teacherId: preProps.navigation.state.params.teacherId,
                selectIdentity: preProps.navigation.state.params.selectIdentity
            }
        }
        return null;
    }
    // componentDidUpdate() {
    //     console.log('update');
    // }
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        });
        if (key === 1) {
            this.fetchAllInfoList();
        }
        if (key === 2) {
           this.fetchNoticeList();
        }
        if(key === 3) {
            this.fetchHomeworkList();
        }
        if (key === 4) {
            this.fetchRateInfo();
        }
    };
    fetchRateInfo = () => {
        const { setRateInfo } = this.props;
        const { navigate } = this.props.navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/rateList',
                    {
                        teacherId: value.selectIdentity === 0 ? value.id : '',
                        selectIdentity: value.selectIdentity,
                        parentId: value.selectIdentity === 1 ? value.id : ''
                    }
                ).then((val) => {
                    setRateInfo(val.rateInfo ? val.rateInfo: '');
                });
            });
        }, navigate);
    };
    fetchAllInfoList = () => {
        const { navigation, setAllInfoList } = this.props;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/allInfoList', {
                    selectIdentity: value.selectIdentity,
                    parentId: value.selectIdentity === 1 ? value.id : '',
                    teacherId: value.id
                }).then((val) => {
                    setAllInfoList(val.allInfoList);
                });
            })
        }, navigate);
    };
    fetchNoticeList = () => {
        const { navigation, setNoticeList } = this.props;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/noticeList', {
                    selectIdentity: value.selectIdentity,
                    parentId: value.selectIdentity === 1 ? value.id : '',
                    teacherId: value.id
                }).then((val) => {
                    setNoticeList(val.noticeList);
                });
            });
        }, navigate);
    };
    fetchHomeworkList = () => {
        const { navigation, setHomeworkList } = this.props;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/homeWorkList', {
                    selectIdentity: value.selectIdentity,
                    parentId: value.selectIdentity === 1 ? value.id : '',
                    teacherId: value.id
                }).then((val) => {
                    setHomeworkList(val.homeworkList);
                });
            });
        }, navigate);
    };
    toManageInfo = (infoId, classId) => {
        this.setState({
            showDeleteBtn: !this.state.showDeleteBtn,
            currentInfoId: infoId,
            currentSelectClassId: classId
        })
    };
    toDeleteInfo = () => {
        const { navigate } = this.props.navigation;
        const { currentInfoId, currentSelectClassId, selectKey } = this.state;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/deleteInfo', {
                    teacherId: value.id,
                    infoId: currentInfoId,
                    classId: currentSelectClassId
                }).then((val) => {
                    if (val.deleteInfoSuccess){
                        Alert.alert(
                            'Alert',
                            `删除成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        this.setState({
                                            showDeleteBtn: false
                                        });
                                        if (selectKey === 1) {
                                            this.fetchAllInfoList();
                                        }
                                        if (selectKey === 2) {
                                            this.fetchNoticeList();
                                        }
                                        if(selectKey === 3) {
                                            this.fetchHomeworkList();
                                        }
                                    }},
                            ],
                            { cancelable: false }
                        );
                    }
                });
            });
        }, navigate);
    };
    getRenderItem = () => {
        const { selectIdentity, teacherId, showDeleteBtn, currentInfoId, currentSelectClassId } = this.state;
        return({item}) => (
            <View style={styles.infoItem}>
                <View style={styles.infoHeader}>
                    <Image
                        source={{uri: getProtocol() + item['class_img_url']}}
                        style={styles.infoImg}
                    />
                    <View style={styles.infoText}>
                        <Text>{item['class_grade']}{item['class_name']} | </Text>
                        <Text style={styles.teacher}>{item['teacher_name']}老师发布</Text>
                    </View>
                    {
                        selectIdentity === 0 ?
                            (teacherId === item['teacher_id'] ?
                                <TouchableOpacity
                                    style={styles.deleteIcon}
                                    onPress={() => this.toManageInfo(item['info_id'], item['class_id'])}
                                >
                                    <Icon
                                        name={'expand-more'}   //expand-less, 'expand-more'
                                        color="gray"
                                        size={20}
                                    />
                                    {
                                        (currentInfoId === item['info_id'] && currentSelectClassId === item['class_id'])?
                                            <View style={!showDeleteBtn ? styles.hidden : styles.manageInfo}>
                                                <View style={styles.triangleView}>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.manageInfoItem}
                                                    onPress={this.toDeleteInfo}
                                                >
                                                    <Text>删除</Text>
                                                </TouchableOpacity>
                                            </View> : null
                                    }
                                </TouchableOpacity>
                                : null) : null
                    }
                </View>
                <View style={styles.title}>
                    <Icon
                        name={item['is_notice'] === '0' ? 'mail' : 'home'}
                        color='#00aced' />
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <Text numberOfLines={1}>{item.content}</Text>
                <Text style={styles.timeText}>{moment(item['create_time']).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
        );
    };
    toSelectVisibleClass = () => {
        const { navigate } = this.props.navigation;
        navigate('SelectVisibleClass', {
            fetchAllInfoList: this.fetchAllInfoList
        });
    };
    render() {
        const { selectKey, selectIdentity } = this.state;
        const { navigation, noticeList, homeworkList, allInfoList, setRateInfo, rateInfo } = this.props;
        return(
            <View style={styles.main}>
                <PublicHeader title="通知" />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                <View style={styles.infoContainer}>
                    {selectKey === 1 ?
                        <FlatList
                            data={allInfoList}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业和公告"/>}
                            keyExtractor={(item, index) => index.toString()}
                        /> : null
                    }
                    {selectKey === 2 ?
                        <FlatList
                            data={noticeList}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无公告"/>}
                            keyExtractor={(item, index) => index.toString()}
                        /> : null
                    }
                    {selectKey === 3 ?
                        <FlatList
                            data={homeworkList}
                            renderItem={this.getRenderItem()}
                            ListEmptyComponent={<PublicNoContent tips="暂无作业"/>}
                            keyExtractor={(item, index) => index.toString()}
                        /> : null
                    }
                    {selectKey === 4 ?
                        <Rate
                            navigation={navigation}
                            rateInfo={rateInfo}
                            fetchRateInfo={this.fetchRateInfo}
                        />: null
                    }

                </View>
                {
                    ((selectIdentity === 0 && (selectKey === 1 || selectKey === 2 || selectKey === 3) && (allInfoList.length > 0 || noticeList.length > 0 || homeworkList.length > 0)) ?
                        <TouchableOpacity
                            style={styles.edit}
                            onPress={this.toSelectVisibleClass}
                        >
                            <Icon
                                name='edit'
                                color='#00aced'
                                size={25}
                            />
                        </TouchableOpacity> : null
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    edit: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    infoContainer: {
        marginTop: 10
    },
    infoItem: {
        height: 150,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    infoHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteIcon: {
        position: 'absolute',
        right: 5
    },
    infoImg: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    infoText: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10
    },
    teacher: {
        fontSize: 12,
        color: 'gray',
        marginRight: 10,
        alignSelf: 'center'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    titleText: {
        marginLeft: 8
    },
    timeText: {
        color: 'gray',
        fontSize: 12,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    manageInfo: {
        width: 100,
        height: 30,
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        right: 5,
        top: 25,
        zIndex: 100
    },
    manageInfoItem: {
        display: 'flex',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    triangleView: {
        width: 10,
        height: 10,
        backgroundColor: '#f1f1f1',
        position: 'absolute',
        right: 8,
        top: -5,
        transform: [{ rotate:'45deg' }],
    },
    hidden: {
        display: 'none'
    },
});
const mapStateToProps = (state) => {
    return {
        noticeList: state.infoReducer.noticeList,
        homeworkList: state.infoReducer.homeworkList,
        allInfoList: state.infoReducer.allInfoList,
        rateInfo: state.infoReducer.rateInfo,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNoticeList: (noticeList) => {
            dispatch(infoActions.setNoticeList(noticeList))
        },
        setHomeworkList: (homeworkList) => {
            dispatch(infoActions.setHomeworkList(homeworkList))
        },
        setAllInfoList: (allInfoList) => {
            dispatch(infoActions.setAllInfoList(allInfoList))
        },
        setRateInfo: (rateInfo) => {
            dispatch(infoActions.setRateInfo(rateInfo))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);