import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Main from './Main';

const store = createStore(
  // rootReducer,
  compose(
    applyMiddleware(thunk)
  )
);

store.subscribe(()=>console.log(store.getState()));


const App = () => {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
}

export default App;
