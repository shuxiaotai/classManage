import * as parentTypes from '../Types/parentType';

export const setParentList = (parentList) => {
    return {
        type: parentTypes.SET_PARENT_LIST,
        parentList: parentList
    }
};