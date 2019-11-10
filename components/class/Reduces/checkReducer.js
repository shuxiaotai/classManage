import * as checkTypes from '../Types/checkType';

const init = {
  studentCheckList: [],
  studentCheckDetailList: [],
};

export default (checkReducer = (state = init, action) => {
  switch (action.type) {
    case checkTypes.SET_STUDENT_CHECK_LIST:
      return {...state, studentCheckList: action.studentCheckList};
    case checkTypes.SET_STUDENT_CHECK_DETAIL_LIST:
      return {...state, studentCheckDetailList: action.studentCheckDetailList};
    default:
      return state;
  }
});
