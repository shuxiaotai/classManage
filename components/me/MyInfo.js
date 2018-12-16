import React, { Component } from 'react';
import {Alert, View, AsyncStorage} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import fetchData from "../../public/utils/fetchData";

class MyInfo extends Component{
    constructor() {
        super();
        this.state = {
            username: '',
            phone: ''
        }
    }
    componentDidMount() {
        this.fetchPersonInfo();
    };
    fetchPersonInfo = () => {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/personInfo',
                    {
                        teacherId: value.selectIdentity === 0 ? value.id : '-1',
                        selectIdentity: value.selectIdentity,
                        parentId: value.selectIdentity === 1 ? value.id : '-1'
                    }
                ).then((val) => {
                    this.setState({
                        username: val.personInfo.username,
                        phone: val.personInfo.phone,
                    })
                });
            });
        }, navigate);
    };
    toEdit = (key) => {
        const { navigate } = this.props.navigation;
        const { username, phone } = this.state;
        navigate('EditOrCreateName', {
            title : key === 0 ? '用户名' : (key === 1 ? '密码': '手机号'),
            leftText: '取消',
            rightText: '保存',
            leftName: key === 0 ? username : (key === 1 ? '' : phone),
            key: key,
            rightPressFun: this.savePersonInfo
        })
    };
    savePersonInfo = (name, key) => {
        const { navigate } = this.props.navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/editPersonInfo',
                    {
                        key: key,
                        selectIdentity: value.selectIdentity,
                        teacherId: value.selectIdentity === 0 ? value.id : '-1',
                        parentId: value.selectIdentity === 1 ? value.id : '-1',
                        username: key === 0 ? name : '',
                        password: key === 1 ? name : '',
                        phone: key === 2 ? name : ''
                    }
                ).then((val) => {
                    if (val.editPersonInfoSuccess) {
                        Alert.alert(
                            'Alert',
                            `修改${key === 0 ? '用户名' : (key === 1 ? '密码' : '手机号')}成功`,
                            [
                                {text: 'OK', onPress: () => {
                                        this.fetchPersonInfo();
                                        navigate('MyInfo');
                                    }},
                            ],
                            { cancelable: false }
                        );
                    }
                });
            });
        }, navigate);
    };
    leftFun = () => {
        const { navigation } = this.props;
        const { navigate } = navigation;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/freshToken',
                    {
                        teacherId: value.selectIdentity === 0 ? value.id : '-1',
                        selectIdentity: value.selectIdentity,
                        parentId: value.selectIdentity === 1 ? value.id : '-1'
                    }
                ).then((val) => {
                    AsyncStorage.setItem('token', val.token, function (error) {
                        if (error) {
                            console.log('失败');
                        }else {
                            getTokenInfo().then((value) => {
                                navigate('Me', {
                                    freshToken: true,
                                    username: value.username
                                });
                            });
                        }
                    });
                });
            });
        }, navigate);
    };
    render() {
        const { navigation } = this.props;
        const { username, phone } = this.state;
        return(
            <View>
                <PublicHeader
                    title="个人信息"
                    isLeft={true}
                    navigation={navigation}
                    leftPressFun={this.leftFun}
                />
                <PublicHorizontalItem
                    toTargetFun={() => this.toEdit(0)}
                    leftText="用户名"
                    rightText={username}
                />
                <PublicHorizontalItem
                    toTargetFun={() => this.toEdit(1)}
                    leftText="密码"
                    rightText={'****'}
                />
                <PublicHorizontalItem
                    toTargetFun={() => this.toEdit(2)}
                    leftText="手机号"
                    rightText={phone}
                />
            </View>
        );
    }
}

export default MyInfo;