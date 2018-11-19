import fetchData from "./fetchData";
import {Alert, AsyncStorage} from "react-native";
import jwt_decode from "jwt-decode";


const checkToken = async () => {
    let token = await AsyncStorage.getItem('token', function (error, result) {
        if (error) {
            console.log('失败');
        }
    });
    return fetchData.postData('/checkLogin',
        {
            token: token,
        }
    ).then((val) => {
        return val;
    });
};
export const checkUser = (method, navigate) => {
    checkToken().then((val) => {
        if(val.checkResult) {  //身份有效
            method();
        }else {
            Alert.alert(
                'Alert',
                '身份已过期，点击跳转登录界面',
                [
                    {text: 'OK', onPress: () => navigate('ChooseIdentity')},
                ],
                { cancelable: false }
            );
        }
    });
};

export const getTokenInfo = async () => {
    let token = await AsyncStorage.getItem('token');
    let username = jwt_decode(token).username;
    let selectIdentity = jwt_decode(token).selectIdentity;
    let id = jwt_decode(token).id;
    return {
        username: username,
        selectIdentity: selectIdentity,
        id: id
    }
};
