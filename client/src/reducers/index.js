import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
    errorsReducer,
    messagesReducer,
    usersReducer
});