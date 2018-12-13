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
export const setChildInfo = (childInfo) => {
    return {
        type: classTypes.SET_CHILD_INFO,
        childInfo: childInfo
    }
};
export const setLatestRemark = (latestRemark) => {
    return {
        type: classTypes.SET_LATEST_REMARK,
        latestRemark: latestRemark
    }
};
export const setLatestCheck = (latestCheck) => {
    return {
        type: classTypes.SET_LATEST_CHECK,
        latestCheck: latestCheck
    }
};

