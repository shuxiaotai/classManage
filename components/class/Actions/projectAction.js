import * as projectType from '../Types/projectType';

export const setScheduleList = scheduleList => {
  return {
    type: projectType.SET_SCHEDULE_LIST,
    scheduleList: scheduleList,
  };
};

export const setCourseList = courseList => {
  return {
    type: projectType.SET_COURSE_LIST,
    courseList: courseList,
  };
};
