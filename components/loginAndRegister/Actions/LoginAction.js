import * as Types from '../Types/LoginType';

export const setHasRegister = (hasRegister) => {
    return {
        type: Types.HAS_REGISTER,
        hasRegister: hasRegister
    }
};
export const setUsername = (username) => {
    return {
        type: Types.USER_NAME,
        username: username
    }
};
export const setSelectIdentity = (selectIdentity) => {
    return {
        type: Types.SELECT_IDENTITY,
        selectIdentity: selectIdentity
    }
};