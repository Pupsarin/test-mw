
import React from 'react';

const ChatMessage = props => {
    const {key, message, user} = props;
    return (
        <div className="chat-message">
            <p key={key} style={this.state}><strong>{user}: </strong>{message}</p>
        </div>
    )
}

export default ChatMessage;