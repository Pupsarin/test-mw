import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatMessage from '../components/ChatMessage';

class MessageList extends Component {
    static defaultProps = {
        messages: [
            {user: "Jerry", message: "hello, mike!", message_id: "123_sdas"},
            {user: "Mike", message: "hi, Jerry!", message_id: "134_sdas"},
            {user: "Jerry", message: "Good bye!", message_id: "1we_sdas"}
        ]
    }
    
    render() {
        return(
            <div className='chat-messages'>
                {this.props.messages.map((msg) => <ChatMessage message={msg.message} user={msg.user} key={msg.message_id} />)}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    messages: store.messagesReducer.messages
});

export default connect(mapStateToProps, null)(MessageList);