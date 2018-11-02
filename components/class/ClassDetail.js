import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";
import StudentList from "./StudentList";

const tabItem = [
    {
        name: '学生',
        key: 1,
    }, {
        name: '小组',
        key: 2,
    },  {
        name: '家长',
        key: 3,
    }
];

class ClassDetail extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1
        }
    }

    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        })
    };
    render() {
        const { navigation } = this.props;
        // const { classText } = navigation.state.params;   //为了方便写界面，暂时注释
        const { selectKey } = this.state;
        return(
            <View>
                <PublicHeader title="sssss" isLeft={true} navigation={navigation} />
                <PublicTab tabItem={tabItem} selectKey={selectKey} onChangeSelectKey={this.onChangeSelectKey} />
                {
                    selectKey === 1 ? <StudentList navigation={navigation} /> : null
                }
            </View>
        );

    }
}

export default ClassDetail;

















