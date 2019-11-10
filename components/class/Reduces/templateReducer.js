import * as templateTypes from '../Types/templateType';

const init = {
  praiseTemplateList: [],
  criticizeTemplateList: [],
};

export default (templateReducer = (state = init, action) => {
  switch (action.type) {
    case templateTypes.SET_PRAISE_TEMPLATE_LIST:
      return {...state, praiseTemplateList: action.praiseTemplateList};
    case templateTypes.SET_CRITICIZE_TEMPLATE_LIST:
      return {...state, criticizeTemplateList: action.criticizeTemplateList};
    default:
      return state;
  }
});
