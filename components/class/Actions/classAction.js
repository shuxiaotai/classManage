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

export const setDefaultPraiseIds = (defaultPraiseIds) => {
    return {
        type: classTypes.SET_DEFAULT_PRAISE_IDS,
        defaultPraiseIds: defaultPraiseIds
    }
};
export const setDefaultCriticizeIds = (defaultCriticizeIds) => {
    return {
        type: classTypes.SET_DEFAULT_CRITICIZE_IDS,
        defaultCriticizeIds: defaultCriticizeIds
    }
};
export const setDefaultScheduleIds = (defaultScheduleIds) => {
    return {
        type: classTypes.SET_DEFAULT_SCHEDULE_IDS,
        defaultScheduleIds: defaultScheduleIds
    }
};export const setDefaultCourseIds = (defaultCourseIds) => {
    return {
        type: classTypes.SET_DEFAULT_COURSE_IDS,
        defaultCourseIds: defaultCourseIds
    }
};

