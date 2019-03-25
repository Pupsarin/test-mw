// import {SEND_MESSAGE, MESSAGE_RECEIVED} from '../constants/ActionTypes';

const initialState = {
    users: [
        {username: "Jerry", user_id: "1232323_sdas"},
        {username: "Mike", user_id: "134_s3434das"},
    ]
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        // case SEND_MESSAGE:
        // case MESSAGE_RECEIVED:
        //     return {...state, messages: action.message}
        default:
            return state;
    }
}