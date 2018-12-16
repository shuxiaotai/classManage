import React, { Component } from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";

class JoinClass extends Component{
    constructor(){
        super();
        this.state = {
            classNum: '',
            studentName: ''
        }
    }
    getRightClassComponent = () => {
        return(
            <TextInput
                style={{ width: 200, textAlign: 'right', marginRight: 10 }}
                placeholder="请输入班级号"
                onChangeText={(classNum) => this.setState({classNum})}
            />
        )
    };
    getRightStudentComponent = () => {
        return(
            <TextInput
                style={{ width: 200, textAlign: 'right', marginRight: 10 }}
                placeholder="请输入学生名称"
                onChangeText={(studentName) => this.setState({studentName})}
            />
        )
    };
    toComplete = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        const { classNum, studentName } = this.state;
        const { getChildInfo } = navigation.state.params;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/joinClass', {
                    studentName: studentName,
                    parentId: value.selectIdentity === 1 ? value.id : '-1',
                    classId: classNum,
                }).then((val) => {
                    if (val.joinClassSuccess) {
                        Alert.alert(
                            'Alert',
                            `已发送请求，等待班主任审核`,
                            [
                                {text: 'OK', onPress: () => {
                                        getChildInfo();
                                        navigation.goBack();
                                    }},
                            ],
                            { cancelable: false }
                        );
                    }
                });
            });
        }, navigate);
    };
    render(){
        const { navigation } = this.props;
        return(
            <View>
                <PublicHeader
                    title="加入班级"
                    navigation={navigation}
                    isLeft={true}
                    isRight={true}
                    rightComponent={<Text style={{ color: '#fff' }}>完成</Text>}
                    rightPressFun={this.toComplete}
                />
                <PublicHorizontalItem
                    leftText="班级号"
                    rightComponent={this.getRightClassComponent()}
                    activeOpacity={1}
                    autoCapitalize="none"
                />
                <PublicHorizontalItem
                    leftText="学生名称"
                    rightComponent={this.getRightStudentComponent()}
                    activeOpacity={1}
                    autoCapitalize="none"
                />
            </View>
        );
    }
}

export default JoinClass;