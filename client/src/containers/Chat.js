import React from 'react';
import { connect } from 'react-redux';
import Inputs from './Inputs';
import ListOfUsers from './ListOfUsers';
import MessageList from './MessageList';
import { withStyles } from '@material-ui/core/styles';
import materialStyle from '../styles/materialStyle'

const Chat = props => {
    const { classes } = props;
    return(
        <div className={classes.main}>
            <ListOfUsers />
            <section className='messages'>
                <MessageList />
                <Inputs />
            </section>
        </div>
    )
}


export default connect()(withStyles(materialStyle)(Chat));
