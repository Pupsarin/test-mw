import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';
import SocketContext from '../socket';
import { setOnlineUsers, setAllUsersForAdmin } from '../actions';

class ListOfUsersWO extends Component {
    
    componentWillMount() { 
        this.props.socket.on('users_online', (users) => {
            this.props.setOnlineUsers(users);
        });

        this.props.socket.on('all_users', (allUsers) => {
            this.props.setAllUsersForAdmin(allUsers);
        });
    }

    render(){
        return(
            <div className='chat-users'>
                {this.props.allUsers.length === 0 
                    ? this.props.users.map(({username}) => <ListUserItem key={username} username={username}/>)
                    : this.props.allUsers.map(({username}) => 
                                                        <ListUserItem 
                                                            key={username}
                                                            username={username}
                                                            admin={true}
                                                        />)
                }
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
    users: store.usersReducer.usersOnline,
    allUsers: store.usersReducer.availableUsers
});

export default connect(mapStateToProps, { setOnlineUsers, setAllUsersForAdmin })(ListOfUsers);