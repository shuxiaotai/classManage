import * as studentTypes from '../Types/studentType';

export const setStudentList = (studentList) => {
    return {
        type: studentTypes.SET_STUDENT_LIST,
        studentList: studentList
    }
};