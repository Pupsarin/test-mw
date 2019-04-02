import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatMessage from '../components/ChatMessage';
import { receiveSocketMessages, receiveSocketMessage } from '../actions'
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';

import SocketContext from '../socket';


class MessageListWO extends Component {
    componentDidMount() {
        this.props.socket.on('messages', (messages) => {
            this.props.receiveSocketMessages(messages);
        });
    }
    componentWillMount() {
        this.props.socket.on('update', (message) => {
            this.props.receiveSocketMessage(message);
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.chatMessages}>
                {this.props.messages.map(({messageBody, user, _id}) => 
                        <ChatMessage message={messageBody} username={user.username} key={_id} />
                    )}
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
    receiveSocketMessages,
    receiveSocketMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyle)(MessageList));