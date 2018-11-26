import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AlertIOS } from 'react-native';
import listData from "../../public/mockData/listData";
import PublicBtn from "../../public/components/PublicBtn";
import PublicImageItem from "../../public/components/PublicImageItem";
import CheckChart from "./CheckChart";

const checkItem = [
    {
        id: 0,
        name: '出勤'
    },
    {
        id: 1,
        name: '缺勤'
    },
    {
        id: 2,
        name: '迟到'
    },
    {
        id: 3,
        name: '请假'
    },
];

class CheckList extends Component{
    constructor() {
        super();
        this.state = {
            changeCheckTips: false
        }
    }
    changeCheckTips = (item) => {
        if (item.checkTipsId === 3) {
            item.checkTipsId = 1;
        }else {
            item.checkTipsId++;
        }
        this.setState({
            changeCheckTips: !this.state.changeCheckTips
        })
    };
    toCheckChart = (val) => {
        // console.log(val);
        const { navigate } = this.props.navigation;
        navigate('CheckChart');
    };
    saveCheckRecord = () => {
        AlertIOS.prompt(
            'Alert',
            '给这次考勤起个名字吧',
            [
                {
                    text: '取消',
                    onPress: () => console.log('取消'),
                    style: 'cancel',
                },
                {
                    text: '确认',
                    onPress: (val) => this.toCheckChart(val),
                },
            ],
        );
    };
    render() {
        return(
            <View>
                <PublicImageItem
                    checkItem={checkItem}
                    changeCheckTips={this.changeCheckTips}
                />
                <PublicBtn
                    tips="保存考勤记录"
                    onPress={this.saveCheckRecord}
                />
            </View>
        )
    }
}

export default CheckList;