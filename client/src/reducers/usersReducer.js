import { SET_CURRENT_USER, SET_ONLINE_USERS } from '../constants/ActionTypes';

const initialState = {
    usersOnline: [],
    currentUser: null
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser: action.user}
        case SET_ONLINE_USERS: 
            return {...state, usersOnline: action.users}
        default:
            return state;
    }
}