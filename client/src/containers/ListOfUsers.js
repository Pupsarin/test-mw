import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';

class ListOfUsers extends Component {
    render(){
        return(
            <div className='chat-users'>
                {this.props.users.map(({username, user_id}) => <ListUserItem key={user_id} username={username}/>)}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    users: store.usersReducer.users
});

export default connect(mapStateToProps)(ListOfUsers);