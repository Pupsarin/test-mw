import { SOCKET_MESSAGE_RECEIVED } from '../constants/ActionTypes';

const initialState = {
    messages: []
}

export default function messagesReducer(state = initialState, action){
    switch (action.type) {
        // case SEND_MESSAGE:
        case SOCKET_MESSAGE_RECEIVED:
            return {...state, messages: action.payload}
        default:
            return state;
    }
}