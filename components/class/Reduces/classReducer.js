import * as classTypes from '../Types/classType';

const init = {
    classList: [],
    currentClassId: -1
};

export default classReducer = (state = init, action) => {
    switch (action.type) {
        case classTypes.SET_CLASS_LIST:
            return {...state, classList: action.classList};
        case classTypes.SET_CURRENT_CLASS_ID:
            return {...state, currentClassId: action.currentClassId};
        default:
            return state;
    }
};