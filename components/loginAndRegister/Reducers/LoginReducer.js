import * as Types from '../Types/LoginType';

const init = {
    isLogin: false
};


export default LoginReducer = (state = init, action) => {
    switch (action.type) {
        case Types.IS_LOGIN:
            return {...state, isLogin: action.isLogin};
        default:
            return state;
    }
}