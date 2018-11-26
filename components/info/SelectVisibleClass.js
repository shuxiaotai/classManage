import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicTab from "../../public/components/PublicTab";

const tabItem = [
    {
        key: 1,
        name: '发布公告'
    },
    {
        key: 2,
        name: '发布作业'
    }
];
class SelectVisibleClass extends Component{
    constructor() {
        super();
        this.state = {
            selectKey: 1
        }
    }
    onChangeSelectKey = (key) => {
        this.setState({
            selectKey: key
        });
    };
    render() {
        const { selectKey } = this.state;
        const { navigation } = this.props;
        return(
            <View>
                <PublicHeader
                    title="选择可见班级"
                    isLeft={true}
                    navigation={navigation}
                />
                <PublicTab
                    tabItem={tabItem}
                    selectKey={selectKey}
                    onChangeSelectKey={this.onChangeSelectKey}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({

});
export default SelectVisibleClass;