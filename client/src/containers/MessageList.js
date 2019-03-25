import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatMessage from '../components/ChatMessage';

class MessageList extends Component {
    
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