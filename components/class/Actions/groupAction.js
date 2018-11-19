import * as groupTypes from '../Types/groupType';

export const setGroupList = (groupList) => {
    return {
        type: groupTypes.SET_GROUP_LIST,
        groupList: groupList
    }
};

export const setCurrentGroup = (currentGroup) => {
    return {
        type: groupTypes.SET_CURRENT_GROUP,
        currentGroup: currentGroup
    }
};

export const setStudentOfGroup = (studentOfGroup) => {
    return {
        type: groupTypes.SET_STUDENT_OF_GROUP,
        studentOfGroup: studentOfGroup
    }
};