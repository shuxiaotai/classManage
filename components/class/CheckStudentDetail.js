import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicSelectTime from "../../public/components/PublicSelectTime";
import PublicMask from "../../public/components/PublicMask";
import listData from "../../public/mockData/listData";
import PublicImageItem from "../../public/components/PublicImageItem";

class CheckStudentDetail extends Component{
    constructor() {
        super();
        this.state = {
            showSelectTime: false,
            selectTabKey: 0,   //左边那个
            selectTimeKey: 1,
            selectTimeName: ''
        }
    }
    handleShowSelectTime = (selectTabKey) => {    //显示和关闭两个下拉框
        this.setState({
            showSelectTime: !this.state.showSelectTime,
            selectTabKey: selectTabKey
        })
    };
    selectTimeFun = (id, name) => {
        this.setState({
            selectTimeKey: id,
            showSelectTime: false,
            selectTimeName: name,
        });
    };
    render() {
        const { navigation } = this.props;
        const { showSelectTime, selectTabKey, selectTimeKey, selectTimeName } = this.state;
        return(
            <View>
                <PublicHeader
                    title="考勤学生详情"
                    isLeft={true}
                    navigation={navigation}
                />
                <View style={styles.selectItemContainer}>
                    <PublicSelectTime
                        selectTimeName={selectTabKey === 0 ? (selectTimeName === '' ? '本周' : selectTimeName) : '本周'}
                        showSelectTime={selectTabKey === 0 ? showSelectTime : false}
                        selectTimeKey={selectTimeKey}
                        top={27}
                        handleShowSelectTime={() => this.handleShowSelectTime(0)}
                        selectTimeFun={this.selectTimeFun}
                    />
                    <PublicSelectTime
                        selectTimeName={selectTabKey === 1 ? (selectTimeName === '' ? '按缺勤次数' : selectTimeName) : '按缺勤次数'}
                        showSelectTime={selectTabKey === 1 ? showSelectTime : false}
                        selectTimeKey={1}
                        top={27}
                        arrowRight={20}
                        data={listData.selectCheckCountList}
                        height={160}
                        handleShowSelectTime={() => this.handleShowSelectTime(1)}
                        selectTimeFun={this.selectTimeFun}
                    />
                </View>
                <PublicImageItem
                    rightName="出勤1次"
                />
                <PublicMask
                    isVisible={showSelectTime}
                    width={'100%'}
                    height={Dimensions.get('window').height - 104}
                    top={104}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    selectItemContainer: {
        height: 40,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    checkListContainer: {
        width: '100%',
        marginTop: 10
    },
    checkListItem: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    },
    stuAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 10
    },
    checkTips: {
        position: 'absolute',
        right: 20
    }
});
export default CheckStudentDetail;