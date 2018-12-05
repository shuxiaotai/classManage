import * as infoTypes from '../Types/infoType';

export const setMasterClassList = (masterClassList) => {
    return {
        type: infoTypes.SET_MASTER_CLASS_LIST,
        masterClassList: masterClassList
    }
};
export const setTeacherClassList = (teacherClassList) => {
    return {
        type: infoTypes.SET_TEACHER_CLASS_LIST,
        teacherClassList: teacherClassList
    }
};

export const setNoticeList = (noticeList) => {
    return {
        type: infoTypes.SET_NOTICE_LIST,
        noticeList: noticeList
    }
};
export const setHomeworkList = (homeworkList) => {
    return {
        type: infoTypes.SET_HOMEWORK_LIST,
        homeworkList: homeworkList
    }
};

export const setAllInfoList = (allInfoList) => {
    return {
        type: infoTypes.SET_ALL_INFO_LIST,
        allInfoList: allInfoList
    }
};

export const setRateInfo = (rateInfo) => {
    return {
        type: infoTypes.SET_RATE_INFO,
        rateInfo: rateInfo
    }
};