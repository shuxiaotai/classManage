import * as Types from '../Types/LoginType';

const init = {
  hasRegister: false,
  username: '',
  selectIdentity: 0,
};

export default (LoginReducer = (state = init, action) => {
  switch (action.type) {
    case Types.HAS_REGISTER:
      return {...state, hasRegister: action.hasRegister};
    case Types.USER_NAME:
      return {...state, username: action.username};
    case Types.SELECT_IDENTITY:
      return {...state, selectIdentity: action.selectIdentity};
    default:
      return state;
  }
});
