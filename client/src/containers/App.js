import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './Main';
import { default as rootReducer } from '../reducers';
// import socketMiddleware from '../middleware/socketMiddleware';

import io from 'socket.io-client';
import SocketContext from '../socket';

const token = '123';
const host = `http://localhost:3001?token=${token}`;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      // socketMiddleware(host),
      thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(()=>console.log(store.getState()));

let socket = io(host);

class App extends Component {
    render(){
      return (
      <Provider store={store}>
        <SocketContext.Provider store={store} value={socket}>
          <Router>
            <Main />
          </Router>
        </SocketContext.Provider>
      </Provider>
    );
      }
}

export default App;
