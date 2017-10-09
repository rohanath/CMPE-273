import {createStore, compose, combineReducers,applyMiddleware} from "redux";
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';
import { createSession } from 'redux-session';
import userReducer from "../reducer/userReducer";
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import {persistStore, autoRehydrate} from 'redux-persist'

//const store =  createStore(combineReducers({userReducer}));

//1/////////////////////////////////////
//const store = createStore(combineReducers({userReducer}), undefined, compose( applyMiddleware(...), autoRehydrate()));
//persistStore(store);

//2/////////////////////////////////////
let store = compose(autoRehydrate())(createStore)(combineReducers({userReducer}));
persistStore(store);

export default store;
//if(localStorage.jwtToken){
//  setAuthorizationToken(localStorage.jwtToken);
//  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
//}

//const session = createSession({ ns: 'Dropbox3' });
//const store = createStore(combineReducers({userReducer}), applyMiddleware(session));
//sessionService.initSessionService(store,options);

//export default store;
//store.subscribe(() => {
//  console.log("Store updated!!!", store.getState());
//});
