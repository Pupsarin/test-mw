import React, { Component } from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';
import ListOfUsers from './ListOfUsers';
import MessageList from './MessageList';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../actions';


import io from 'socket.io-client';
import SocketContext from '../socket';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            mobileOpen: false
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }
    componentWillMount() {
        // const token = localStorage.chatToken;
        const host = `http://localhost:3001?token=${localStorage.chatToken}`;
        let socket = io(host);
        this.setState({...this.state, socket});
    }

    componentWillUnmount() {
        this.state.socket.emit('disconnect');
        this.state.socket.close();
        this.setState({...this.state, socket: null});
        this.props.logout();
        delete localStorage.chatToken;
    }

    handleDrawerToggle() {
        this.setState({...this.state, mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes } = this.props;
        return(
            <SocketContext.Provider value={this.state.socket}>
                <div className={classes.main}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant='temporary'
                            anchor='left'
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <ListOfUsers />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <ListOfUsers />
                        </Drawer>
                    </Hidden>
                    <main className={classes.messages}>
                        <MessageList />
                        <AppBar position="fixed" className={classes.appBar}>
                            <IconButton
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                                >
                                <MenuIcon />
                            </IconButton>
                            <Inputs />
                        </AppBar>
                    </main>
                </div>
            </SocketContext.Provider>
        )
    }
}

const mapDispatchToProps = {
    logout
}


export default connect(null, mapDispatchToProps)(withStyles(materialStyle)(Chat));
