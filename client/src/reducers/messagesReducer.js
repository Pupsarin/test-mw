import { MESSAGES_RECEIVED, RECEIVE_MESSAGE } from '../constants/ActionTypes';
import colors from '../styles/colors';

const initialState = {
    messages: [],
    distinctUsers: []
}

function colorForDistinctUsers(messagesList) {
    let users = messagesList.map((item)=>{
        return {
            username: item.user.username
        };
    });
    let uniqueUsers = [];
    let map = new Map();
    for (let user of users) {
        if(!map.has(user.username)){
            map.set(user.username, true);
            user.color = colors[(Math.random() * colors.length)|0]
            uniqueUsers.push(user);
        }
    }
    return uniqueUsers;   
}

export default function messagesReducer(state = initialState, action){
    switch (action.type) {
        case RECEIVE_MESSAGE: 
            let updatedMessages = state.messages.map((m) => {return {...m}});
            updatedMessages.push(action.payload);
            if (state.distinctUsers.filter(({username}) => username === action.payload.user.username)) {
                let updatedDistinctUsers = state.distinctUsers.map((u) => {return {...u}});
                let newUser = { 
                    username: action.payload.user.username, 
                    color: colors[(Math.random() * colors.length)|0] 
                }
                updatedDistinctUsers.push(newUser);
                return {...state, messages: updatedMessages, distinctUsers: updatedDistinctUsers}
            }
            return {...state, messages: updatedMessages}

        case MESSAGES_RECEIVED:
            return {...state, messages: action.payload, distinctUsers: colorForDistinctUsers(action.payload)}

        default:
            return state;
    }
}


