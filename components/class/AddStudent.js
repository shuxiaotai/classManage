import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import listData from "../../public/mockData/listData";

class AddStudent extends Component{
    constructor() {
        super();
        this.state = {
            studentName: ''
        }
    }
    getHeaderTextComponent = (text) => {
        return(
            <Text style={{ color: '#fff' }}>
                {text}
            </Text>
        );
    };
    getStudentName = () => {
        alert(this.state.studentName);
    };
    render() {
        const { navigation } = this.props;
        return(
            <View style={{ marginBottom: 100 }}>
                <PublicHeader
                    isLeft={true}
                    navigation={navigation}
                    title="添加学生"
                    leftComponent={this.getHeaderTextComponent('取消')}
                    isRight={true}
                    rightComponent={this.getHeaderTextComponent('完成')}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.addStuInput}
                        onChangeText={(studentName) => this.setState({studentName})}
                        value={this.state.studentName}
                        placeholder="请输入学生姓名(16个字符内)"
                    />
                    <Text
                        style={styles.addStuText}
                        onPress={this.getStudentName}
                    >
                        添加
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={styles.stuList}
                >
                    {
                        listData.addStuList.map((item) => (
                            <View style={styles.stuItem} key={item.key}>
                                <Image
                                    source={require('../../public/img/test.png')}   //uri: item.avatarUrl
                                    style={styles.stuAvatar}
                                />
                                <Text style={styles.stuText}>
                                    {item.studentName}
                                </Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addStuInput: {
        height: 40,
        borderColor: '#f1f1f1',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 13,
        flex: 1
    },
    addStuText: {
        position: 'absolute',
        right: 10,
        color: '#00aced',
    },
    stuAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    stuList: {
        marginTop: 10,
        paddingBottom: 20
    },
    stuItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1'
    },
    stuText: {
        fontSize: 16,
        marginLeft: 7
    }
});

export default AddStudent;