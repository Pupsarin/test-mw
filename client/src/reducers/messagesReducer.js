import {SEND_MESSAGE, MESSAGE_RECEIVED} from '../constants/ActionTypes';

const initialState = {
    messages: []
}

export default function messagesReducer(state = initialState, action){
    switch (action.type) {
        case SEND_MESSAGE:
        case MESSAGE_RECEIVED:
            return {...state, messages: action.message}
        default:
            return state;
    }
}