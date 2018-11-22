import React, { Component } from 'react';
import {Text, View, AsyncStorage, Alert} from 'react-native';
import PublicHeader from "../../public/components/PublicHeader";
import PublicBtn from "../../public/components/PublicBtn";
import {getTokenInfo} from "../../public/utils/checkUser";

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
                <PublicHeader title="我" />
                <Text>{username}</Text>
                <PublicBtn
                    tips="退出登录"
                    onPress={this.toLogout}
                />
            </View>
        );
    }
}
export default meScreen;