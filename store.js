import { createStore, combineReducers } from 'redux';
import LoginReducer from './components/loginAndRegister/Reducers/LoginReducer';
import classReducer from './components/class/Reduces/classReducer';

const reducers = combineReducers({
    LoginReducer,
    classReducer
});
const store = createStore(
    reducers
);

export default store;