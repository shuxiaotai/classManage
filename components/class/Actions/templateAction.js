import * as templateType from '../Types/templateType';

export const setPraiseTemplateList = (praiseTemplateList) => {
    return {
        type: templateType.SET_PRAISE_TEMPLATE_LIST,
        praiseTemplateList: praiseTemplateList
    }
};

export const setCriticizeTemplateList = (criticizeTemplateList) => {
    return {
        type: templateType.SET_CRITICIZE_TEMPLATE_LIST,
        criticizeTemplateList: criticizeTemplateList
    }
};