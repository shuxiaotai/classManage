import * as classTypes from '../Types/classType';

export const setClassList = (classList) => {
    return {
        type: classTypes.SET_CLASS_LIST,
        classList: classList
    }
};

