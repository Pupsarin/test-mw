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
            errors={props.errors}
            {...props}
            />
            ) }/>
        { !localStorage.chatToken && ( <Redirect to='/enter-chat' /> ) }        
        <Route path='/' render={() => { return(<Chat />) }}/>
    </Switch>
)

function mapStateToProps(state) {
    return {
        errors: state.errorsReducer
    }
}


export default withRouter(connect(mapStateToProps, { authUser })(Main));