import * as Types from '../Types/LoginType';

export default function isLoginFunc(isLogin) {
    return {
        type: Types.IS_LOGIN,
        isLogin: isLogin
    }
}