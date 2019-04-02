
import React, { Component } from 'react';

class ChatMessage extends Component {
    render(){
        const {message, username, usernameColor} = this.props;
        return (
            <div className="chat-message">
                <p><strong style={{color: usernameColor}}>{username}: </strong>{message}</p>
            </div>
        )
    }
}

export default ChatMessage;