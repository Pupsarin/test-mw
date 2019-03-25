import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './Main';
import { default as rootReducer } from '../reducers';
import io from 'socket.io-client';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(()=>console.log(store.getState()));


class App extends Component {
  componentDidMount(){
    const socket = io('http://localhost:3001');
  }
    render(){
      return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
      }
}

export default App;
