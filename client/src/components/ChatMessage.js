
import React, { Component } from 'react';
import io from 'socket.io-client';

class ChatMessage extends Component {
    // constructor(props){ 
    //     super(props);
    // }

    componentDidMount(){
        const socket = io('http://localhost:3001');
        socket.emit('first_connection');
        socket.on('messages');
    }

    render(){
        const {key, message, user} = this.props;
        return (
            <div className="chat-message">
                <p key={key}><strong>{user}: </strong>{message}</p>
            </div>
        )
    }
}

export default ChatMessage;