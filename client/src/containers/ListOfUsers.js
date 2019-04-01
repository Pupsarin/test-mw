import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUserItem from '../components/ListUserItem';
import SocketContext from '../socket';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle'
import { setOnlineUsers, setAllUsersForAdmin } from '../actions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

class ListOfUsersWO extends Component {

    componentWillMount() {
        this.props.socket.on('all_users', (allUsers) => {
            this.props.setAllUsersForAdmin(allUsers);
        });
        
        this.props.socket.on('users_online', (users) => {
            this.props.setOnlineUsers(users);
        });
    }

    render(){
    
        const { allUsers, users, classes, isBanned, isMuted} = this.props
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
                    <ListItem button>
                        <ListItemText>Logout</ListItemText>
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

export default connect(mapStateToProps, { setOnlineUsers, setAllUsersForAdmin })(withStyles(materialStyle)(ListOfUsers));