import { SET_ONLINE_USERS, SET_ALL_AVAILABLE_USERS } from '../constants/ActionTypes';

const initialState = {
    usersOnline: [],
    availableUsers: []
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        case SET_ONLINE_USERS: 
            return {...state, usersOnline: action.users}
        case SET_ALL_AVAILABLE_USERS:
            return {...state, availableUsers: action.allUsers}
        default:
            return state;
    }
}