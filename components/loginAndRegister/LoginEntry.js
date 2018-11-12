import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";
import LoginLogo from './LoginLogo';

class LoginEntry extends Component{

    toLoginOrRegister = () => {
        const { navigate } = this.props.navigation;
        navigate('LoginOrRegister')
    };
    render() {
        return(
            <View style={styles.loginContainer}>
                <LoginLogo />
                <View style={styles.loginInputContainer}>
                    <Text>账号</Text>
                    <TextInput
                        placeholder="请输入用户名登录/注册"
                        style={styles.loginInput}
                    />
                </View>
                <PublicBtn
                    tips="下一步"
                    onPress={this.toLoginOrRegister}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 100,
        flex: 1,
        flexDirection: 'column',
    },
    loginInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 20
    },
    loginInput: {
        paddingLeft: 10
    },
});
export default LoginEntry;