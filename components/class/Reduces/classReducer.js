import * as classTypes from '../Types/classType';

const init = {
    classList: [],
};

export default classReducer = (state = init, action) => {
    switch (action.type) {
        case classTypes.SET_CLASS_LIST:
            return {...state, classList: action.classList};
        default:
            return state;
    }
};