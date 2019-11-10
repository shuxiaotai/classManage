import * as groupTypes from '../Types/groupType';

export const setGroupList = groupList => {
  return {
    type: groupTypes.SET_GROUP_LIST,
    groupList: groupList,
  };
};

export const setCurrentGroup = currentGroup => {
  return {
    type: groupTypes.SET_CURRENT_GROUP,
    currentGroup: currentGroup,
  };
};

export const setStudentOfGroup = studentOfGroup => {
  return {
    type: groupTypes.SET_STUDENT_OF_GROUP,
    studentOfGroup: studentOfGroup,
  };
};

export const setIsRemarkGroup = isRemarkGroup => {
  return {
    type: groupTypes.IS_REMARK_GROUP,
    isRemarkGroup: isRemarkGroup,
  };
};

export const setRemarkGroupStudentIds = remarkGroupStudentIds => {
  return {
    type: groupTypes.SET_REMARK_GROUP_STUDENT_IDS,
    remarkGroupStudentIds: remarkGroupStudentIds,
  };
};
