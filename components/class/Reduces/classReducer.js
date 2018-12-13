import * as classTypes from '../Types/classType';

const init = {
    classList: [],
    currentClassId: -1,
    childInfo: '',  //下面是家长端
    latestRemark: [],
    latestCheck: [], //上面是家长端
    templateComplete: false,
    projectComplete: false
};

export default classReducer = (state = init, action) => {
    switch (action.type) {
        case classTypes.SET_CLASS_LIST:
            return {...state, classList: action.classList};
        case classTypes.SET_CURRENT_CLASS_ID:
            return {...state, currentClassId: action.currentClassId};
        case classTypes.SET_CHILD_INFO:
            return {...state, childInfo: action.childInfo};
        case classTypes.SET_LATEST_REMARK:
            return {...state, latestRemark: action.latestRemark};
        case classTypes.SET_LATEST_CHECK:
            return {...state, latestCheck: action.latestCheck};
        case classTypes.SET_TEMPLATE_COMPLETE:
            return {...state, templateComplete: action.templateComplete};
        case classTypes.SET_PROJECT_COMPLETE:
            return {...state, projectComplete: action.projectComplete};
        default:
            return state;
    }
};