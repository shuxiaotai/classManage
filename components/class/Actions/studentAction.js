import * as studentTypes from '../Types/studentType';

export const setStudentList = (studentList) => {
    return {
        type: studentTypes.SET_STUDENT_LIST,
        studentList: studentList
    }
};
export const setAddStudentList = (addStudentList) => {
    return {
        type: studentTypes.ADD_STUDENT_LIST,
        addStudentList: addStudentList
    }
};

export const setCurrentStudent = (currentStudent) => {
    return {
        type: studentTypes.SET_CURRENT_STUDENT,
        currentStudent: currentStudent
    }
};