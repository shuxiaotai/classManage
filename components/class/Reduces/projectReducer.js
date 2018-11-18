import * as projectTypes from '../Types/projectType';

const init = {
    scheduleList: [],
    courseList: []
};

export default projectReducer = (state = init, action) => {
    switch (action.type) {
        case projectTypes.SET_SCHEDULE_LIST:
            return{...state, scheduleList: action.scheduleList}
        case projectTypes.SET_COURSE_LIST:
            return{...state, courseList: action.courseList}
        default:
            return state;
    }
};