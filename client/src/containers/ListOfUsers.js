import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListOfUsers extends Component {
    render(){
        return(
            <div className='chat-users'>
                {this.props.users.map((usr) => <p key={usr.user_id}>{usr.username}</p>)}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    users: store.usersReducer.users
});

export default connect(mapStateToProps)(ListOfUsers);