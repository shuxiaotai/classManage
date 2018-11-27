import React, { Component } from 'react';
import PublicHeader from "../../public/components/PublicHeader";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";

class PublishNoticeOrHomeWork extends Component{
    render() {
        const { navigation } = this.props;
        return(
            <View>
                <PublicHeader
                    title="发布作业"
                    navigation={navigation}
                    isLeft={true}
                />
                <View style={styles.publishContainer}>
                    <View style={styles.titleContainer}>
                        <Text>作业标题</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="最多可输入20字"
                        />
                    </View>
                    <TextInput
                        placeholder="请输入内容，最多可输入1000字"
                        multiline={true}
                        style={styles.contentInput}
                    />
                </View>
                <PublicBtn
                    tips="发布作业"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    publishContainer: {
        height: 250,
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    titleInput: {
        paddingLeft: 10,
        zIndex: 100,
        width: 250
    },
    contentInput: {
        // backgroundColor: 'skyblue',
        height: 200,
        paddingLeft: 10,
        paddingTop: 10
    }
});
export default PublishNoticeOrHomeWork;