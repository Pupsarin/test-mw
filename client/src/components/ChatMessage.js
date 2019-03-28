
import React, { Component } from 'react';

class ChatMessage extends Component {
    render(){
        const {message, username} = this.props;
        return (
            <div className="chat-message">
                <p><strong>{username}: </strong>{message}</p>
            </div>
        )
    }
}

export default ChatMessage;