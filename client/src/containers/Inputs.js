import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import { sendSocketMessage } from '../actions';
import SocketContext from '../socket';

class InputsWO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        if (typeof this.props.sendSocketMessage === 'function'){
            this.props.socket.send(
                this.props.sendSocketMessage(this.state.message).payload
                );
            this.setState({...this.state, message: ""});
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="inputs">
            <InputBase
                placeholder="Enter message..." 
                name="message"
                autoComplete="off"
                value={this.state.message}
                onChange={this.handleInput}
            />
            <IconButton type="submit">
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

export default connect(null, { sendSocketMessage })(Inputs);