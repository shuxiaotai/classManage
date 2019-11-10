import * as studentTypes from '../Types/studentType';

const init = {
  studentList: [],
  addStudentList: [],
  currentStudent: '',
  studentRemarkInfo: '',
  studentRemarkList: [],
};

export default (studentReducer = (state = init, action) => {
  switch (action.type) {
    case studentTypes.SET_STUDENT_LIST:
      return {...state, studentList: action.studentList};
    case studentTypes.ADD_STUDENT_LIST:
      return {...state, addStudentList: action.addStudentList};
    case studentTypes.SET_CURRENT_STUDENT:
      return {...state, currentStudent: action.currentStudent};
    case studentTypes.SET_STUDENT_REMARK_INFO:
      return {...state, studentRemarkInfo: action.studentRemarkInfo};
    case studentTypes.SET_STUDENT_REMARK_LIST:
      return {...state, studentRemarkList: action.studentRemarkList};
    default:
      return state;
  }
});
