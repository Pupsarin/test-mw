import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';
import SocketContext from '../socket';
import { setOnlineUsers } from '../actions';

class ListOfUsersWO extends Component {
    
    componentWillMount() {
        this.props.socket.on('users_online', (users) => {
            this.props.setOnlineUsers(users);
        });
    }

    render(){
        return(
            <div className='chat-users'>
                {this.props.users.map(({name}) => <ListUserItem key={name} username={name}/>)}
            </div>
        )
    }
}

const ListOfUsers = props => (
    <SocketContext.Consumer>
        {socket => <ListOfUsersWO {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = store => ({
    users: store.usersReducer.usersOnline
});

export default connect(mapStateToProps, { setOnlineUsers })(ListOfUsers);