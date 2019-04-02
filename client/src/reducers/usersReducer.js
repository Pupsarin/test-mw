import { 
    SET_ONLINE_USERS,
    SET_ALL_AVAILABLE_USERS,
    BAN_USER,
    UNBAN_USER,
    MUTE_USER,
    UNMUTE_USER,
    LOGOUT,
        } from '../constants/ActionTypes';

const initialState = {
    usersOnline: [],
    availableUsers: []
}
function banMuteStatusUpdate(state, action) {
    let updatedUsers = state.availableUsers.map((u) => {return {...u}});
    updatedUsers.forEach((u) => {
        if (u.username === action.user.username) {
            Object.assign(u, action.user);
        }
    });
    return { ...state, availableUsers: updatedUsers} 
}

export default function usersReducer(state = initialState, action){
    switch (action.type) {
        case SET_ONLINE_USERS: 
            return {...state, usersOnline: action.users}
        case SET_ALL_AVAILABLE_USERS:
            return {...state, availableUsers: action.allUsers}
        case BAN_USER:
        case UNBAN_USER:
        case MUTE_USER:
        case UNMUTE_USER:
            return banMuteStatusUpdate(state, action);
        case LOGOUT:
            return {...state, availableUsers: []}
        default:
            return state;
    }
}