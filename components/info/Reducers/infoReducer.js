import * as infoTypes from '../Types/infoType';

const init = {
    masterClassList: [],
    teacherClassList: [],
    noticeList: [],
    homeworkList: [],
    allInfoList: [],
    rateInfo: ''
};

export default infoReducer = (state = init, action) => {
    switch (action.type) {
        case infoTypes.SET_MASTER_CLASS_LIST:
            return{...state, masterClassList: action.masterClassList};
        case infoTypes.SET_TEACHER_CLASS_LIST:
            return{...state, teacherClassList: action.teacherClassList};
        case infoTypes.SET_NOTICE_LIST:
            return{...state, noticeList: action.noticeList};
        case infoTypes.SET_HOMEWORK_LIST:
            return{...state, homeworkList: action.homeworkList};
        case infoTypes.SET_ALL_INFO_LIST:
            return{...state, allInfoList: action.allInfoList};
        case infoTypes.SET_RATE_INFO:
            return{...state, rateInfo: action.rateInfo};
        default:
            return state;
    }
};