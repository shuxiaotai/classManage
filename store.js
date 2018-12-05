import { createStore, combineReducers } from 'redux';
import LoginReducer from './components/loginAndRegister/Reducers/LoginReducer';
import classReducer from './components/class/Reduces/classReducer';
import studentReducer from './components/class/Reduces/studentReducer';
import parentReducer from './components/class/Reduces/parentReducer';
import groupReducer from './components/class/Reduces/groupReducer';
import templateReducer from './components/class/Reduces/templateReducer';
import projectReducer from './components/class/Reduces/projectReducer';
import checkReducer from './components/class/Reduces/checkReducer';
import infoReducer from './components/info/Reducers/infoReducer';

const reducers = combineReducers({
    LoginReducer,
    classReducer,
    studentReducer,
    parentReducer,
    groupReducer,
    templateReducer,
    projectReducer,
    checkReducer,
    infoReducer
});
const store = createStore(
    reducers
);

export default store;