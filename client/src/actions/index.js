import { 
        SEND_MESSAGE,
        MESSAGES_RECEIVED,
        RECEIVE_MESSAGE,
        SET_ONLINE_USERS, 
        SET_ALL_AVAILABLE_USERS, 
        ADD_ERROR, 
        REMOVE_ERROR,
        BAN_USER,
        UNBAN_USER,
        MUTE_USER,
        UNMUTE_USER,
    } from '../constants/ActionTypes';


export function banUser(user) {
    return {
        type : BAN_USER,
        user
    }
}

export function unbanUser(user) {
    return {
        type : UNBAN_USER,
        user
    }
}

export function muteUser(user) {
    return {
        type : MUTE_USER,
        user
    }
}

export function unmuteUser(user) {
    return {
        type : UNMUTE_USER,
        user
    }
}

export function sendSocketMessage(message) {
    return {
        type : SEND_MESSAGE,
        payload : message
    }
}

export function receiveSocketMessage(message) {
    return {
        type : RECEIVE_MESSAGE,
        payload : message,
    }
}

export function receiveSocketMessages(messages) {
    return {
        type : MESSAGES_RECEIVED,
        payload : messages,
    }
}

export function setOnlineUsers(users) {
    return {
        type: SET_ONLINE_USERS,
        users,
    }
}

export function setAllUsersForAdmin(allUsers) {
    return {
        type: SET_ALL_AVAILABLE_USERS,
        allUsers
    }
}

export function addError(error) {
    return {
        type: ADD_ERROR,
        error
    }
}

export function removeError() {
    return {
        type: REMOVE_ERROR
    }
}

export function authUser(userData) {
    return dispatch => {
        return fetch('/auth',
            {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(userData)
            })
            .then( res => {
                return res.json()
            })
            .then( ({token, message}) => {
                if(!message) {
                    localStorage.setItem('chatToken', token);
                    dispatch(removeError());
                    return token
                } else {
                    dispatch(addError(message));
                }
            })
            .catch(err => 
                console.log(err)
            )
    }
}