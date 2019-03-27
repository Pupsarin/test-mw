import io from 'socket.io-client';
import { receiveSocketMessages } from '../actions';
import { SEND_WEBSOCKET_MESSAGE } from '../constants/ActionTypes'

const socketMiddleware = (url) => {
    return store => {
        const socket = io(url);
        
        socket.on("messages", (messages) => {
            store.dispatch(receiveSocketMessages(messages));
        });
        
        return next => action => {
            if(action.type === SEND_WEBSOCKET_MESSAGE) {
                socket.send(action.payload);
                return;
            }
            
            return next(action);
        }
    }
}

export default socketMiddleware;