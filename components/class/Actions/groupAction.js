import * as groupTypes from '../Types/groupType';

export const setGroupList = (groupList) => {
    return {
        type: groupTypes.SET_GROUP_LIST,
        groupList: groupList
    }
};