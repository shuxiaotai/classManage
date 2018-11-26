import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicSelectTime from "../../public/components/PublicSelectTime";
import PublicMask from "../../public/components/PublicMask";
import CheckStudentDetail from "./CheckStudentDetail";

class CheckChart extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            selectTimeName: '本周',
            selectTimeKey: 1,
        }
    }
    handleShowSelectTime = () => {
        this.setState({
            showSelectTime: !this.state.showSelectTime
        })
    };
    selectTimeFun = (id, name) => {
        this.setState({
            selectTimeKey: id,
            showSelectTime: false,
            selectTimeName: name
        });
    };
    toCheckStudentDetail = () => {
        const { navigate } = this.props.navigation;
        navigate('CheckStudentDetail');
    };
    render() {
        const { navigation } = this.props;
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
                    />
                </View>
                <PublicMask
                    isVisible={showSelectTime}
                    width={'100%'}
                    height={Dimensions.get('window').height - 104}
                    top={104}
                />
                <View style={styles.checkChartWrapper}>
                    <View style={styles.checkChartItem}>
                        <Text style={styles.checkChartTop}>
                            11月23日的考勤记录
                        </Text>
                        <View style={styles.checkChartBottom}>
                            <Text style={[styles.checkChartBottomText, styles.checkChartBottomLeftText]}>
                                sxt老师
                            </Text>
                            <Text style={styles.checkChartBottomText}>
                                2018-10-10 10:20:20
                            </Text>
                        </View>
                        <View style={styles.checkRate}>
                            <Text style={styles.checkRateText}>
                                出勤率100%
                            </Text>
                        </View>
                    </View>
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
        borderRadius: 5
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
export default CheckChart;