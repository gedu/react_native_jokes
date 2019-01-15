import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { JokeReducer } from './JokeWidget';

const appReducer = combineReducers({ JokeReducer });

let store = createStore(
    (state, action) => { return appReducer(state, action); },
    compose(applyMiddleware(thunk))
);

export default store;