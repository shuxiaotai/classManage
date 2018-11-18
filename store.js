import { createStore, combineReducers } from 'redux';
import LoginReducer from './components/loginAndRegister/Reducers/LoginReducer';
import classReducer from './components/class/Reduces/classReducer';
import studentReducer from './components/class/Reduces/studentReducer';
import parentReducer from './components/class/Reduces/parentReducer';
import groupReducer from './components/class/Reduces/groupReducer';

const reducers = combineReducers({
    LoginReducer,
    classReducer,
    studentReducer,
    parentReducer,
    groupReducer
});
const store = createStore(
    reducers
);

export default store;