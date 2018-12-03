import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import LoginLogo from './LoginLogo';
import PublicBtn from "../../public/components/PublicBtn";
import fetchData from "../../public/utils/fetchData";
import * as loginActions from "./Actions/LoginAction";

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
                            Alert.alert(
                                'Alert',
                                '登录成功',
                                [
                                    {text: 'OK', onPress: () => navigate('Class')},
                                ],
                                { cancelable: false }
                            );
                        }
                    });
                }else {
                    alert('用户名或密码错误');
                }
            });
        }
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
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);