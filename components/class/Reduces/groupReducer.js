import * as groupTypes from '../Types/groupType';

const init = {
    groupList: []
};

export default groupReducer = (state = init, action) => {
    switch (action.type) {
        case groupTypes.SET_GROUP_LIST:
            return{...state, groupList: action.groupList};
        default:
            return state;
    }
};