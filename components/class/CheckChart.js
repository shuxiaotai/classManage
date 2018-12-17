import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicSelectTime from "../../public/components/PublicSelectTime";
import PublicMask from "../../public/components/PublicMask";
import CheckStudentDetail from "./CheckStudentDetail";
import { connect } from 'react-redux';
import * as checkActions from './Actions/checkAction';
import fetchData from "../../public/utils/fetchData";
import {checkUser} from "../../public/utils/checkUser";
import moment from "moment/moment";
import listData from "../../public/mockData/listData";

class CheckChart extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            selectTimeName: '本周',
            selectTimeKey: 1,
        }
    }
    componentDidMount() {
        this.fetchStudentCheckList(1);
    }
    fetchStudentCheckList = (id) => {
        const { navigate } = this.props.navigation;
        const { currentClassId, setStudentCheckList } = this.props;
        checkUser(() => {
            fetchData.postData('/studentCheckList',
                {
                    time: id,
                    classId: currentClassId
                }
            ).then((val) => {
                setStudentCheckList(val.studentCheckList)
            });
        }, navigate);
    };
    handleShowSelectTime = () => {
        this.setState({
            showSelectTime: !this.state.showSelectTime
        })
    };
    selectTimeFun = (id, name) => {
        this.fetchStudentCheckList(id);
        this.setState({
            selectTimeKey: id,
            showSelectTime: false,
            selectTimeName: name
        });
    };
    toCheckStudentDetail = () => {
        const { navigate } = this.props.navigation;
        navigate('CheckStudentDetail', {
            isParent: 0
        });
    };
    toCheckChartDetail = (checkId) => {
        const { navigate } = this.props.navigation;
        navigate('CheckChartDetail', {
            checkId: checkId
        });
    };
    render() {
        const { navigation, studentCheckList } = this.props;
        const { showSelectTime, selectTimeKey, selectTimeName } = this.state;
        return(
            <View>
                <PublicHeader
                    title="考勤报表"
                    isLeft={true}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>学生详情</Text>}
                    navigation={navigation}
                    rightPressFun={this.toCheckStudentDetail}
                />
                <View style={styles.selectTimeContainer}>
                    <PublicSelectTime
                        selectTimeName={selectTimeName}
                        showSelectTime={showSelectTime}
                        handleShowSelectTime={this.handleShowSelectTime}
                        selectTimeFun={this.selectTimeFun}
                        selectTimeKey={selectTimeKey}
                        arrowRight={130}
                        data={listData.selectTimeList}
                    />
                </View>
                <PublicMask
                    isVisible={showSelectTime}
                    width={'100%'}
                    height={Dimensions.get('window').height - 104}
                    top={104}
                />
                <View style={styles.checkChartWrapper}>
                    {
                        studentCheckList.map((item) => {
                            return(
                                <TouchableOpacity
                                    style={styles.checkChartItem}
                                    key={item.id}
                                    activeOpacity={0.6}
                                    onPress={() => this.toCheckChartDetail(item.id)}
                                >
                                    <Text style={styles.checkChartTop}>
                                        {item.name}
                                    </Text>
                                    <View style={styles.checkChartBottom}>
                                        <Text style={[styles.checkChartBottomText, styles.checkChartBottomLeftText]}>
                                            {item['teacher_name']}老师
                                        </Text>
                                        <Text style={styles.checkChartBottomText}>
                                            {moment(item['create_time']).format('YYYY-MM-DD HH:mm:ss')}
                                        </Text>
                                    </View>
                                    <View style={styles.checkRate}>
                                        <Text style={styles.checkRateText}>
                                            出勤率{(item['check_percent'] * 100)}%
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selectTimeContainer: {
        height: 35,
        marginTop: 0,
        backgroundColor: '#fff',
        zIndex: 100
    },
    checkChartWrapper: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    checkChartItem: {
        height: 80,
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 5,
        marginBottom: 8
    },
    checkRate: {
        height: 80,
        backgroundColor: 'skyblue',
        width: 60,
        position: 'absolute',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkRateText: {
        color: '#fff',
        textAlign: 'center'
    },
    checkChartTop: {
        marginLeft: 20,
        marginTop: 20
    },
    checkChartBottom: {
        flexDirection: 'row',
        marginTop: 10
    },
    checkChartBottomText: {
        fontSize: 12,
        color: 'gray'
    },
    checkChartBottomLeftText: {
        marginLeft: 20,
        marginRight: 60
    }
});
const mapStateToProps = (state) => {
    return {
        studentCheckList: state.checkReducer.studentCheckList,
        currentClassId: state.classReducer.currentClassId,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStudentCheckList: (studentCheckList) => {
            dispatch(checkActions.setStudentCheckList(studentCheckList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckChart);