import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';
import SocketContext from '../socket';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';
import { setOnlineUsers, setAllUsersForAdmin, banUser, unbanUser, muteUser, unmuteUser } from '../actions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import singleton from '../other/singleton'


class ListOfUsersWO extends Component {
    componentWillMount() {
        this.props.socket.on('all_users', (allUsers) => {
            this.props.setAllUsersForAdmin(allUsers);
        });
        
        this.props.socket.on('users_online', (users) => {
            this.props.setOnlineUsers(users);
        });

        this.props.socket.on('banned', (user) => {
            this.props.banUser(user);
        });

        this.props.socket.on('unbanned', (user) => {
            this.props.banUser(user);
        });

        this.props.socket.on('muted', (user) => {
            this.props.banUser(user);
        });

        this.props.socket.on('unmuted', (user) => {
            this.props.banUser(user);
        });

    }

    render(){
    
        const { allUsers, users, classes} = this.props

        return(
            <div className='chat-users'>
                { allUsers.length === 0 
                    ? users.map(({username}) => <ListUserItem key={username} username={username}/>)
                    : allUsers.map(({username, isOnline, isBanned, isMuted}) => 
                                                        <ListUserItem 
                                                            key={username}
                                                            username={username}
                                                            admin={true}
                                                            isOnline={isOnline}
                                                            isBanned={isBanned}
                                                            isMuted={isMuted}
                                                        />)
                }
                
                <Link to='/enter-chat' className={classes.link}>
                <Divider />
                    <ListItem button>
                        <ListItemText>LOGOUT</ListItemText>
                    </ListItem>
                </Link>
                <Link to='/' className={classes.link} onClick={() => singleton.get('http://localhost:3001/')}>
                <Divider />
                    <ListItem button>
                        <ListItemText>singleton test</ListItemText>
                    </ListItem>
                </Link>
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

const mapDispatchToProps = {
    banUser, 
    unbanUser, 
    muteUser, 
    unmuteUser,
    setOnlineUsers,
    setAllUsersForAdmin
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyle)(ListOfUsers));