import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./actions/store"
import App from './App';
import {Router} from 'react-router-dom';
//import {loadState,saveState} from './localStorage.js'

//const persistedState = loadState();

/*
store.subscribe(() => {
  saveState(store.getState());
});
*/

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
