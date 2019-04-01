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

import io from 'socket.io-client';
import SocketContext from '../socket';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            mobileOpen: false
        }
    }
    componentWillMount() {
        // const token = localStorage.chatToken;
        const host = `http://localhost:3001?token=${localStorage.chatToken}`;
        let socket = io(host);
        this.setState({socket});
    }

    componentWillUnmount() {
        this.state.socket.emit('disconnect');
        this.state.socket.close();
        this.setState({socket: null});
        delete localStorage.chatToken;
    }


    render() {
        const { classes } = this.props;
        return(
            <SocketContext.Provider value={this.state.socket}>
                <div className={classes.main}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant='temporary'
                            anchor='right'
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
                            <Inputs />
                        </AppBar>
                    </main>
                </div>
            </SocketContext.Provider>
        )
    }
}


export default connect()(withStyles(materialStyle)(Chat));
