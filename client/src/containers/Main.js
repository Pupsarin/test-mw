import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Chat from './Chat';
import AuthForm from './AuthForm';
import { authUser } from '../actions';

const Main = (props) => (
    <Switch>
        <Route path="/enter-chat" render={ () => (
            <AuthForm 
            auth={props.authUser}
            {...props}
            />
            ) }/>
        { !localStorage.chatToken && ( <Redirect to='/enter-chat' /> ) }        
        <Route exact path='/' render={() => { return(<Chat />) }}/>
    </Switch>
)

export default withRouter(connect(null, { authUser })(Main));