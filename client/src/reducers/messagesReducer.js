import {SEND_MESSAGE, MESSAGE_RECEIVED} from '../constants/ActionTypes';

const initialState = {
    messages: [
        {user: "Jerry", message: "hello, mike!", message_id: "123_sdas"},
        {user: "Mike", message: "hi, Jerry!", message_id: "134_sdas"},
        {user: "Jerry", message: "Good bye!", message_id: "1we_sdas"}
    ]
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