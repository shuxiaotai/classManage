import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import LoginLogo from './LoginLogo';
import PublicBtn from "../../public/components/PublicBtn";

class LoginOrRegister extends Component{

    toFront = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };
    toRegister = () => {
        const { navigate } = this.props.navigation;
        navigate('ChooseIdentity');
    };
    toHome = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    };
    render() {
        const { isLogin } = this.props.navigation.state.params;
        // const isLogin = true;
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
                    !isLogin ?
                        <View style={styles.loginInputContainer}>
                            <Text>注册新账号</Text>
                            <TextInput
                                style={styles.loginInput}
                                value="122234"
                            />
                        </View> :
                        <Text style={styles.loginTips}>您正在以 sxt 登录</Text>
                }

                <View style={styles.loginInputContainer}>
                    <Text>{isLogin ? '密码' : '设置密码'}</Text>
                    <TextInput
                        placeholder="6-16位英文或数字"
                        style={styles.loginInput}
                    />
                </View>
                <PublicBtn
                    tips={isLogin ? '登录': '注册'}
                    onPress={!isLogin ? this.toRegister : this.toHome}
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
        paddingLeft: 10
    },
});

export default LoginOrRegister