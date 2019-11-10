import * as groupTypes from '../Types/groupType';

const init = {
  groupList: [],
  currentGroup: '',
  studentOfGroup: [],
  isRemarkGroup: false,
  remarkGroupStudentIds: [],
};

export default (groupReducer = (state = init, action) => {
  switch (action.type) {
    case groupTypes.SET_GROUP_LIST:
      return {...state, groupList: action.groupList};
    case groupTypes.SET_CURRENT_GROUP:
      return {...state, currentGroup: action.currentGroup};
    case groupTypes.SET_STUDENT_OF_GROUP:
      return {...state, studentOfGroup: action.studentOfGroup};
    case groupTypes.IS_REMARK_GROUP:
      return {...state, isRemarkGroup: action.isRemarkGroup};
    case groupTypes.SET_REMARK_GROUP_STUDENT_IDS:
      return {...state, remarkGroupStudentIds: action.remarkGroupStudentIds};
    default:
      return state;
  }
});
