import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatMessage from '../components/ChatMessage';
import { receiveSocketMessages } from '../actions'

import SocketContext from '../socket';


class MessageListWO extends Component {
    componentDidMount() {
        this.props.socket.on('messages', (messages) => {
            this.props.receiveSocketMessages(messages);
        });
    }
    componentWillMount() {
        this.props.socket.on('update', (messages) => {
            this.props.receiveSocketMessages(messages);
        });
    }

    render() {
        return(
            <div className='chat-messages'>
                {this.props.messages.map((msg) => <ChatMessage message={msg.messageBody} user={msg.user.username} key={msg._id} />)}
            </div>
        )
    }
}

const MessageList = props => (
    <SocketContext.Consumer>
        {socket => <MessageListWO {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = store => ({
    messages: store.messagesReducer.messages
});

const mapDispatchToProps = {
    receiveSocketMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);