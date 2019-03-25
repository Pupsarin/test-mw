import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';


class Inputs extends Component { 
    send(e){
        e.preventDefault();
        // if (typeof this.props.onSend === 'function'){
        //     this.props.onSend(this.state.usernameInput, this.state.messageInput);
        //     this.setState({...this.state, messageInput: "", usernameInput: ""});
        // }
    }

    render() {
        return(
            <form onSubmit={this.send} className="inputs">
            <InputBase
                placeholder="Enter message..." 
                // type="text"
                name="messageInput"
                autoComplete="off"
                // value={this.state.messageInput}
                // onChange={this.onChange}
            />
            <IconButton>
                <Send/>
            </IconButton>
            </form>
            )
    }
}

export default connect()(Inputs);