import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';

class ListOfUsers extends Component {
    render(){
        return(
            <div className='chat-users'>
                {this.props.users.map((usr) => <ListUserItem username={usr.username} key={usr.user_id}/>)}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    users: store.usersReducer.users
});

export default connect(mapStateToProps)(ListOfUsers);