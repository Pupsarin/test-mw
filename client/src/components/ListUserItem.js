import React, { Component } from 'react';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Report from '@material-ui/icons/Report';
import ReportOff from '@material-ui/icons/ReportOff';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsOff from '@material-ui/icons/NotificationsOff';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SocketContext from '../socket';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';
import { connect } from 'react-redux';
// import lightGreen from '@material-ui/core/colors/lightGreen';


class ListUserItemWO extends Component {
    constructor(props) {
        super(props);
        this.handleMute = this.handleMute.bind(this);
        this.handleUnmute = this.handleUnmute.bind(this);
        this.handleBan = this.handleBan.bind(this);
        this.handleUnban = this.handleUnban.bind(this);

    }
    handleMute() {
        this.props.socket.emit('mute', this.props.username);
    }

    handleUnmute() {
        this.props.socket.emit('unmute', this.props.username);
    }

    handleBan() {
        this.props.socket.emit('ban', this.props.username);
    }
    
    handleUnban() { 
        this.props.socket.emit('unban', this.props.username);
    }

    // componentWillMount(){
    //     this.props.socket.on('admin_banned_user', (user) => {
    //         console.log('admin_banned_user');
    //     });
    // }

    render() {
        const { username, admin, isOnline, isBanned, isMuted } = this.props;
        let isOnlineColor = "";
        let isBannedColor = "";
        let isMutedColor = "";
        isOnline ? isOnlineColor = 'primary' : isOnlineColor = "secondary";
        isBanned ? isBannedColor = 'primary' : isBannedColor = "secondary";
        isMuted ? isMutedColor = 'primary' : isMutedColor = "secondary";
        return(
            <ListItem>
                { admin && <ListItemIcon><FiberManualRecord color={isOnlineColor} /></ListItemIcon> }
                <ListItemText primary={username} />
                { admin &&  (
                    isMuted ? 
                        <IconButton onClick={this.handleUnmute}>
                            <NotificationsOff color={isMutedColor}/>
                        </IconButton> :
                        <IconButton onClick={this.handleMute}>
                            <Notifications color={isMutedColor}/>
                        </IconButton>
                    )
                }
                { admin &&  (
                    isBanned ? 
                        <IconButton onClick={this.handleUnban}>
                            <ReportOff color={isBannedColor} />
                        </IconButton> :
                        <IconButton onClick={this.handleBan}>
                            <Report color={isBannedColor} />
                        </IconButton>)
                }
            </ListItem>
            )
        }     
}

const ListUserItem = props => (
    <SocketContext.Consumer>
        {socket => <ListUserItemWO {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default connect()(withStyles(materialStyle)(ListUserItem));
