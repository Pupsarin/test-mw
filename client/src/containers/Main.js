import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Chat from './Chat';
import AuthForm from './AuthForm';

const Main = (props) => (
    <Switch>
        <Route exact path="/enter-chat" render={ () => {return (<AuthForm />)} }/>
        {/* { true && ( <Redirect to='/enter-chat' /> ) } */}
        <Route exact path='/' render={() => { return(<Chat />) }}/>
    </Switch>
)

export default withRouter(connect()(Main));