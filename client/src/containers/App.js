import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './Main';
import { default as rootReducer } from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(()=>console.log(store.getState()));

class App extends Component {
    render(){
      return (
      <Provider store={store}>
          <Router>
            <Main />
          </Router>
      </Provider>
    );
      }
}

export default App;
