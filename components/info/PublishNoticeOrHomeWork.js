import React, { Component } from 'react';
import PublicHeader from "../../public/components/PublicHeader";
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";

class PublishNoticeOrHomeWork extends Component{
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }
    }
    toPublishNotice = () => {
        const { title, content } = this.state;
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { postNotice, masterClassId, fetchAllInfoList } = navigation.state.params;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/publishNotice',
                    {
                        classId: masterClassId,
                        title: title,
                        content: content,
                        isNotice: postNotice,
                        teacherId: value.id
                    }
                ).then((val) => {
                    if (val.publishNoticeSuccess) {
                        Alert.alert(
                            'Alert',
                            `发布公告成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        fetchAllInfoList();
                                        navigate('Info');
                                    }},
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('发布公告失败');
                    }
                });
            });
        }, navigate);
    };
    toPublishHomework = () => {
        const { title, content } = this.state;
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { postNotice, teacherClassIdArr, fetchAllInfoList } = navigation.state.params;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/publishHomeWork',
                    {
                        classIdArr: teacherClassIdArr,
                        title: title,
                        content: content,
                        isNotice: postNotice,
                        teacherId: value.id
                    }
                ).then((val) => {
                    if (val.publishHomeworkSuccess) {
                        Alert.alert(
                            'Alert',
                            `发布作业成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        fetchAllInfoList();
                                        navigate('Info');
                                    }},
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('发布作业失败');
                    }
                });
            });
        }, navigate);
    };
    render() {
        const { navigation } = this.props;
        const { postNotice } = navigation.state.params;
        return(
            <View>
                <PublicHeader
                    title={`${postNotice === 0 ? '发布公告' : '发布作业'}`}
                    navigation={navigation}
                    isLeft={true}
                />
                <View style={styles.publishContainer}>
                    <View style={styles.titleContainer}>
                        <Text>{`${postNotice === 0 ? '公告' : '作业'}`}标题</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="最多可输入20字"
                            onChangeText={(title) => this.setState({title})}
                        />
                    </View>
                    <TextInput
                        placeholder="请输入内容，最多可输入1000字"
                        multiline={true}
                        style={styles.contentInput}
                        onChangeText={(content) => this.setState({content})}
                    />
                </View>
                <PublicBtn
                    tips={`${postNotice === 0 ? '发布公告' : '发布作业'}`}
                    onPress={postNotice === 0 ? this.toPublishNotice : this.toPublishHomework}
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