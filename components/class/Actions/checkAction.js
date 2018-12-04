import * as checkTypes from '../Types/checkType';

export const setStudentCheckList = (studentCheckList) => {
    return {
        type: checkTypes.SET_STUDENT_CHECK_LIST,
        studentCheckList: studentCheckList
    }
};

export const setStudentCheckDetailList = (studentCheckDetailList) => {
    return {
        type: checkTypes.SET_STUDENT_CHECK_DETAIL_LIST,
        studentCheckDetailList: studentCheckDetailList
    }
};