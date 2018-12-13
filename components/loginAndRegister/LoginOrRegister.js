import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import LoginLogo from './LoginLogo';
import PublicBtn from "../../public/components/PublicBtn";
import fetchData from "../../public/utils/fetchData";
import * as loginActions from "./Actions/LoginAction";
import {checkUser, getTokenInfo} from "../../public/utils/checkUser";
import * as classActions from '../class/Actions/classAction';

class LoginOrRegister extends Component{

    constructor() {
        super();
        this.state = {
            password: '',
            phone: ''
        }
    }

    toFront = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };
    getClassList = (key) => {
        const { navigate } = this.props.navigation;
        const { setClassList } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/classList',
                    {
                        teacherId: value.id,
                        selectIdentity: value.selectIdentity,
                        isCreateByMe: key
                    }
                ).then((val) => {
                    setClassList(val.classList);
                });
            });
        }, navigate);
    };
    toRegister = () => {
        const { username, selectIdentity, setHasRegister } = this.props;
        const { password, phone } = this.state;
        let phoneReg = /^1[34578]\d{9}$/;
        if(phone === '') {
            alert('手机号不能为空');
        }else if(!phoneReg.test(phone)) {
            alert('请输入正确的手机号');
        }else if(password === '') {
            alert('密码不能为空');
        }else {
            fetchData.postData('/register',
                {
                    username: username,
                    password: password,
                    phone: phone,
                    selectIdentity: selectIdentity
                }
            ).then((val) => {
                if (val.registerSuccess) {
                    Alert.alert(
                        'Alert',
                        '注册成功',
                        [
                            {text: 'OK', onPress: () => setHasRegister(true)},
                        ],
                        { cancelable: false }
                    );
                }else {
                    alert('注册失败');
                }
            });
        }
    };
    toLogin = () => {
        const { navigate } = this.props.navigation;
        const { username, selectIdentity } = this.props;
        const { password } = this.state;
        let self = this;
        if (password === '') {
            alert('密码不能为空');
        } else {
            fetchData.postData('/login',
                {
                    username: username,
                    password: password,
                    selectIdentity: selectIdentity
                }
            ).then((val) => {
                if (val.loginSuccess) {
                    AsyncStorage.setItem('token', val.token, function (error) {
                        if (error) {
                            console.log('失败');
                        }else {
                            getTokenInfo().then((tokenValue) => {
                                Alert.alert(
                                    'Alert',
                                    '登录成功',
                                    [
                                        {text: 'OK', onPress: () => {
                                                if(tokenValue.selectIdentity === 0) {
                                                    self.getClassList(0);
                                                }else {
                                                    self.getChildInfo();
                                                }
                                                navigate('Class', {
                                                    isTeacher: true,   //老师之间切换刷新classScreen
                                                    selectIdentity: tokenValue.selectIdentity//老师家长之间切换刷新classScreen
                                                });
                                            }},
                                    ],
                                    { cancelable: false }
                                );
                            });
                        }
                    });
                }else {
                    alert('用户名或密码错误');
                }
            });
        }
    };
    getChildInfo = () => {
        const { navigate } = this.props.navigation;
        const { setChildInfo, setLatestRemark, setLatestCheck } = this.props;
        checkUser(() => {
            getTokenInfo().then((value) => {
                fetchData.postData('/childInfo',
                    {
                        parentId: value.selectIdentity === 1 ? value.id : '',
                        selectIdentity: value.selectIdentity
                    }
                ).then((val) => {
                    setChildInfo(val.personInfo.childInfo);
                    setLatestRemark(val.personInfo.remark);
                    setLatestCheck(val.personInfo.check);
                });
            });
        }, navigate);
    };
    render() {
        const { hasRegister, username } = this.props;
        return(
            <View style={styles.loginOrRegisterContainer}>
                <TouchableOpacity
                    style={styles.backContainer}
                    onPress={this.toFront}
                >
                    <Icon
                        name='chevron-left'
                    />
                    <Text>返回</Text>
                </TouchableOpacity>
                <LoginLogo />
                {
                    hasRegister ?
                        <Text style={styles.loginTips}>您正在以 {username} 登录</Text> :
                        <View>
                            <View style={styles.loginInputContainer}>
                                <Text>注册新账号</Text>
                                <TextInput
                                    style={styles.loginInput}
                                    value={username}
                                />
                            </View>
                            <View style={styles.loginInputContainer}>
                                <Text>设置手机号</Text>
                                <TextInput
                                    placeholder="请输入手机号"
                                    style={styles.loginInput}
                                    onChangeText={(phone) => this.setState({phone})}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>
                }

                <View style={styles.loginInputContainer}>
                    <Text>{hasRegister ? '密码' : '设置密码'}</Text>
                    <TextInput
                        placeholder="6-16位英文或数字"
                        style={styles.loginInput}
                        onChangeText={(password) => this.setState({password})}
                        keyboardType='numeric'
                        secureTextEntry={true}
                    />
                </View>
                <PublicBtn
                    tips={hasRegister ? '登录': '注册'}
                    onPress={!hasRegister ? this.toRegister : this.toLogin}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginOrRegisterContainer: {
        marginTop: 30,
    },
    backContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50
    },
    loginInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 20
    },
    loginTips: {
        marginLeft: 20,
        marginTop: 20
    },
    loginInput: {
        marginLeft: 10,
        zIndex: 10,
        width: 200
    },
});
const mapStateToProps = (state) => {
    return {
        hasRegister: state.LoginReducer.hasRegister,
        username: state.LoginReducer.username,
        selectIdentity: state.LoginReducer.selectIdentity
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setHasRegister: (hasRegister) => {
            dispatch(loginActions.setHasRegister(hasRegister));
        },
        setClassList: (classList) => {
            dispatch(classActions.setClassList(classList));
        },
        setChildInfo: (childInfo) => {
            dispatch(classActions.setChildInfo(childInfo));
        },
        setLatestRemark: (latestRemark) => {
            dispatch(classActions.setLatestRemark(latestRemark));
        },
        setLatestCheck: (latestCheck) => {
            dispatch(classActions.setLatestCheck(latestCheck));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);