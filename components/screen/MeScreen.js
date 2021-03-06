import React, { Component } from 'react';
import {Text, View, AsyncStorage, Alert, StyleSheet, Image} from 'react-native';
import PublicBtn from "../../public/components/PublicBtn";
import {getTokenInfo} from "../../public/utils/checkUser";
import PublicHorizontalItem from "../../public/components/PublicHorizontalItem";
import getProtocol from "../../public/utils/getProtocol";

class meScreen extends Component{
    constructor() {
        super();
        this.state = {
            username: '',
            selectIdentity: -1,
            isFresh: false,
            imgUrl: '',
            freshToken: false
        }
    }
    componentDidMount() {
        this.showInfo();
        getTokenInfo().then((value) => {
            this.setState({
                selectIdentity: value.selectIdentity,
                username: value.username,
                imgUrl: value.imgUrl
            });
        });
        const { navigation } = this.props;
        navigation.setParams({
            isFresh: this.state.isFresh
        });
    }
    static getDerivedStateFromProps(preProps, preState) {
        if (preProps.navigation.state.params && (preState.isFresh !== preProps.navigation.state.params.isFresh)) {
            return {
                isFresh: preProps.navigation.state.params.isFresh,
                username: preProps.navigation.state.params.username,
                imgUrl: preProps.navigation.state.params.imgUrl,
                selectIdentity: preProps.navigation.state.params.selectIdentity,
            }
        }
        //修改信息后
        if (preProps.navigation.state.params && (preState.freshToken !== preProps.navigation.state.params.freshToken)) {
            return {
                username: preProps.navigation.state.params.username,
            }
        }
        return null;
    }
    showInfo() {
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
    toMyRemark = () => {
        const { navigate } = this.props.navigation;
        navigate('MyRemark');
    };
    toParentJoinClassInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('ParentJoinClassInfo');
    };
    toMyInfo = () => {
        const { navigate } = this.props.navigation;
        navigate('MyInfo');
    };
    render() {
        const { username, selectIdentity, imgUrl } = this.state;
        return(
            <View>
                <View style={styles.meInfoContainer}>
                    <Image
                        source={{uri: getProtocol() + imgUrl}}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.userText}>{username}</Text>
                </View>
                <View style={styles.meSettingWrapper}>
                    {
                        selectIdentity === 0 ?
                            <PublicHorizontalItem
                                leftText="我的点评"
                                marginTop={1}
                                toTargetFun={this.toMyRemark}
                            /> : null
                    }
                    <PublicHorizontalItem
                        leftText="验证消息"
                        marginTop={1}
                        toTargetFun={this.toParentJoinClassInfo}
                    />
                    <PublicHorizontalItem
                        leftText="个人信息"
                        marginTop={1}
                        toTargetFun={this.toMyInfo}
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