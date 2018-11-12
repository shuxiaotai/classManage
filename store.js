import { createStore, combineReducers } from 'redux';
import LoginReducer from './components/loginAndRegister/Reducers/LoginReducer';

const reducers = combineReducers({
    LoginReducer
});
const store = createStore(
    reducers
);

export default store;