import React, { Component } from 'react';
import { connect } from 'react-redux';


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
            <input 
                placeholder="Enter message..." 
                type="text"
                name="messageInput"
                autoComplete="off"
                // value={this.state.messageInput}
                // onChange={this.onChange}
            />
            <button type="submit">Send</button>
            </form>
            )
    }
}

export default Inputs;