import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import { sendSocketMessage } from '../actions';
import SocketContext from '../socket';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';

class InputsWO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentWillMount(){
        this.props.socket.on('you_banned', () => {
            this.props.history.push('/enter-chat');
        });
    }

    handleInput(e) {
        if (e.target.value.length < 200) {
            this.setState({...this.state, [e.target.name]: e.target.value});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if (typeof this.props.sendSocketMessage === 'function'){
            this.props.socket.send(
                this.props.sendSocketMessage({message: this.state.message, userToken: localStorage.chatToken }).payload
                );
            this.setState({...this.state, message: ''});
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <form onSubmit={this.handleSubmit} className={classes.sendForm}>
                <InputBase
                    placeholder='Enter message...' 
                    name='message'
                    autoComplete='off'
                    value={this.state.message}
                    onChange={this.handleInput}
                    className={classes.messageInput}
                />
                <IconButton className={classes.sendButton} type='submit'>
                    <Send />
                </IconButton>
            </form>
            )
    }
}

const Inputs = props => (
    <SocketContext.Consumer>
        {socket => <InputsWO {...props} socket={socket} />}
    </SocketContext.Consumer>
)

function mapStateToProps (store) {
    return {
        currentUser: store.usersReducer.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { sendSocketMessage })(withStyles(materialStyle)(Inputs)));