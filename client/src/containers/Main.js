import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle';
import Chat from './Chat';

class Main extends Component {

    render(){ 
        return(
            <Chat />
        );
    }
}

export default connect()(withStyles(materialStyle)(Main));