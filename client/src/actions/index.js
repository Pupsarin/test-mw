import {SEND_WEBSOCKET_MESSAGE, SOCKET_MESSAGE_RECEIVED, SET_CURRENT_USER, ADD_ERROR, REMOVE_ERROR} from '../constants/ActionTypes'; 

export function sendSocketMessage(message) {
    return {
        type : SEND_WEBSOCKET_MESSAGE,
        payload : message
    }
}

export function receiveSocketMessages(messages) {
    return {
        type : SOCKET_MESSAGE_RECEIVED,
        payload : messages
    }
}

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
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
                // debugger
                return res.json()
            })
            .then( ({id, username, token, message}) => {
                if(!message) {
                    localStorage.setItem('chatToken', token);
                    dispatch(removeError());
                    return dispatch(setCurrentUser({id, username}));
                } else {
                    dispatch(addError(message));
                }
            })
            .catch(err => 
                console.log(err)
            )
    }
}