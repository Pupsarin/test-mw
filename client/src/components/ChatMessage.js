
import React, { Component } from 'react';

class ChatMessage extends Component {
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