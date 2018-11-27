import React, { Component } from 'react';
import {Text, View, AsyncStorage, Alert, StyleSheet, Image} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicBtn from "../../public/components/PublicBtn";
import {getTokenInfo} from "../../public/utils/checkUser";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";

class meScreen extends Component{
    constructor() {
        super();
        this.state = {
            username: ''
        }
    }
    componentDidMount() {
        getTokenInfo().then((val) => {
            this.setState({
                username: val.username
            })
        })
    }
    toLogout = () => {
        const { navigate } = this.props.navigation;
        AsyncStorage.removeItem('token', function (error) {
            if (error) {
                console.log('失败');
            } else {
                Alert.alert(
                    'Alert',
                    `退出登录`,
                    [
                        {text: 'OK', onPress: () => {navigate('ChooseIdentity')}},
                    ],
                    { cancelable: false }
                );
            }
        });
    };
    render() {
        const { username } = this.state;
        return(
            <View>
                <View style={styles.meInfoContainer}>
                    <Image
                        source={require('../../public/img/test.png')}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.userText}>{username}</Text>
                </View>
                <View style={styles.meSettingWrapper}>
                    <PublicHorizontalItem
                        leftText="我的点评"
                        marginTop={1}
                    />
                    <PublicHorizontalItem
                        leftText="验证消息"
                        marginTop={1}
                    />
                    <PublicHorizontalItem
                        leftText="个人信息"
                        marginTop={1}
                    />
                </View>
                <PublicBtn
                    tips="退出登录"
                    onPress={this.toLogout}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    meInfoContainer: {
        height: 250,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        paddingTop: 90
    },
    userAvatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10
    },
    userText: {
        fontSize: 20,
        // color: '#fff'
    },
    meSettingWrapper: {
        marginTop: 20
    }
});
export default meScreen;