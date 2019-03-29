import { SET_CURRENT_USER } from '../constants/ActionTypes';

const initialState = {
    users: [
        {username: "Jerry", user_id: "1232323_sdas"},
        {username: "Mike", user_id: "134_s3434das"},
    ],
    currentUser: null
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: action.user}
        default:
            return state;
    }
}