import * as classTypes from '../Types/classType';

export const setClassList = (classList) => {
    return {
        type: classTypes.SET_CLASS_LIST,
        classList: classList
    }
};
export const setCurrentClassId = (currentClassId) => {
    return {
        type: classTypes.SET_CURRENT_CLASS_ID,
        currentClassId: currentClassId
    }
};
