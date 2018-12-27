import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet, Image, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import { connect } from 'react-redux';
import * as studentActions from './Actions/studentAction';
import {checkUser} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";
import getProtocol from "../../public/utils/getProtocol";

class AddStudent extends Component{
    constructor() {
        super();
        this.state = {
            studentName: ''
        }
    }
    componentDidMount() {
        const { setAddStudentList } = this.props;
        setAddStudentList([]);
    }
    getHeaderTextComponent = (text) => {
        return(
            <Text style={{ color: '#fff' }}>
                {text}
            </Text>
        );
    };
    addStudentName = () => {
        const { studentName } = this.state;
        const { addStudentList, setAddStudentList } = this.props;
        if (studentName === '') {
            alert('学生姓名不能为空');
        }else {
            let student = {
                name: studentName,  //头像暂时先不做
                avatar_url: `/img/student${Math.floor(Math.random()*(1 - 14) + 14)}.jpg`
            };
            setAddStudentList([...addStudentList, student]);
            this.setState({
                studentName: ''
            });
        }
    };
    toAddStudentList = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { currentClassId, addStudentList } = this.props;
        const { getStudentList } = navigation.state.params;
        if (addStudentList.length === 0) {
            alert('请先添加学生');
        } else {
            checkUser(() => {
                fetchData.postData('/addStudentList',
                    {
                        currentClassId: currentClassId,
                        addStudentList: addStudentList
                    }
                ).then((val) => {
                    if(val.addStudentListSuccess) {
                        Alert.alert(
                            'Alert',
                            '添加成功',
                            [
                                {text: 'OK', onPress: () => {
                                        getStudentList();
                                        navigation.goBack();
                                    }},
                            ],
                            { cancelable: false }
                        );
                    }else {
                        alert('添加失败');
                    }
                });
            }, navigate);
        }
    };
    render() {
        const { navigation, addStudentList } = this.props;
        return(
            <View style={{ marginBottom: 100 }}>
                <PublicHeader
                    isLeft={true}
                    navigation={navigation}
                    title="添加学生"
                    leftComponent={this.getHeaderTextComponent('取消')}
                    isRight={true}
                    rightComponent={this.getHeaderTextComponent('完成')}
                    rightPressFun={this.toAddStudentList}
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
                        onPress={this.addStudentName}
                    >
                        添加
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={styles.stuList}
                >
                    {
                        addStudentList.map((item, index) => {
                            return(
                                <View style={styles.stuItem} key={index}>
                                    <Image
                                        source={{uri: getProtocol() + item['avatar_url']}}
                                        style={styles.stuAvatar}
                                    />
                                    <Text style={styles.stuText}>
                                        {item.name}
                                    </Text>
                                </View>
                            )
                        })
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

const mapStateToProps = (state) => {
    return {
        addStudentList: state.studentReducer.addStudentList,
        currentClassId: state.classReducer.currentClassId
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAddStudentList: (addStudentList) => {
            dispatch(studentActions.setAddStudentList(addStudentList));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);