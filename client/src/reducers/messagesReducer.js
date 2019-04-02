import { MESSAGES_RECEIVED, RECEIVE_MESSAGE } from '../constants/ActionTypes';

const initialState = {
    messages: []
}

export default function messagesReducer(state = initialState, action){
    switch (action.type) {
        case RECEIVE_MESSAGE: {
            let updatedMessages = state.messages.map((m) => {return {...m}});
            updatedMessages.push(action.payload);
            return {...state, messages: updatedMessages}
        }
        case MESSAGES_RECEIVED:
            return {...state, messages: action.payload}
        default:
            return state;
    }
}