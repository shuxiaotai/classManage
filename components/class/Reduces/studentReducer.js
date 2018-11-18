import * as studentTypes from '../Types/studentType';

const init = {
    studentList: []
};

export default studentReducer = (state = init, action) => {
    switch (action.type) {
        case studentTypes.SET_STUDENT_LIST:
            return{...state, studentList: action.studentList}
        default:
            return state;
    }
};