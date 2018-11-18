import * as parentTypes from '../Types/parentType';

const init = {
    parentList: []
};

export default parentReducer = (state = init, action) => {
    switch (action.type) {
        case parentTypes.SET_PARENT_LIST:
            return{...state, parentList: action.parentList}
        default:
            return state;
    }
};