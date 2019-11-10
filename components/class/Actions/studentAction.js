import * as studentTypes from '../Types/studentType';

export const setStudentList = studentList => {
  return {
    type: studentTypes.SET_STUDENT_LIST,
    studentList: studentList,
  };
};
export const setAddStudentList = addStudentList => {
  return {
    type: studentTypes.ADD_STUDENT_LIST,
    addStudentList: addStudentList,
  };
};

export const setCurrentStudent = currentStudent => {
  return {
    type: studentTypes.SET_CURRENT_STUDENT,
    currentStudent: currentStudent,
  };
};

export const setStudentRemarkInfo = studentRemarkInfo => {
  return {
    type: studentTypes.SET_STUDENT_REMARK_INFO,
    studentRemarkInfo: studentRemarkInfo,
  };
};

export const setStudentRemarkList = studentRemarkList => {
  return {
    type: studentTypes.SET_STUDENT_REMARK_LIST,
    studentRemarkList: studentRemarkList,
  };
};
