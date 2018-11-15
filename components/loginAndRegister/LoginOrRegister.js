import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import app from "../../app.json";
import { Icon } from 'react-native-elements';
import LoginLogo from './LoginLogo';
import PublicBtn from "../../public/components/PublicBtn";
import fetchData from "../../public/utils/fetchData";

class LoginOrRegister extends Component{

    constructor() {
        super();
        this.state = {
            password: ''
        }
    }

    toFront = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };
    toRegister = () => {
        const { navigate } = this.props.navigation;
        // navigate('ChooseIdentity');
    };
    toLogin = () => {
        const { navigate } = this.props.navigation;
        const { username, selectIdentity } = this.props;
        const { password } = this.state;
        fetchData.postData(app.host + app.port + '/login',
            {
                username: username,
                password: password,
                selectIdentity: selectIdentity
            }
        ).then((val) => {
            if (val.data === '登录成功') {
                Alert.alert(
                    'Alert',
                    val.data,
                    [
                        {text: 'OK', onPress: () => navigate('Home')},
                    ],
                    { cancelable: false }
                );
            }else {
                alert(val.data);
            }
        });
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
                        <View style={styles.loginInputContainer}>
                            <Text>注册新账号</Text>
                            <TextInput
                                style={styles.loginInput}
                                value={username}
                            />
                        </View>
                }

                <View style={styles.loginInputContainer}>
                    <Text>{hasRegister ? '密码' : '设置密码'}</Text>
                    <TextInput
                        placeholder="6-16位英文或数字"
                        style={styles.loginInput}
                        onChangeText={(password) => this.setState({password})}
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
        paddingLeft: 10
    },
});
const mapStateToProps = (state) => {
    return {
        hasRegister: state.LoginReducer.hasRegister,
        username: state.LoginReducer.username,
        selectIdentity: state.LoginReducer.selectIdentity
    }
};
export default connect(mapStateToProps, null)(LoginOrRegister);