import { ADD_ERROR, REMOVE_ERROR } from '../constants/ActionTypes';

const initialState = {
    message: null
}

export default function messagesReducer(state = initialState, action){
    switch (action.type) {
        // case SEND_MESSAGE:
        case ADD_ERROR:
            return {...state, message: action.error}
        case REMOVE_ERROR:
            return {...state, message: null}
        default:
            return state;
    }
}