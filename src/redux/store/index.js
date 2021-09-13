import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/index';
import reduxThunk from 'redux-thunk';

// const dev = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(reducer, applyMiddleware(reduxThunk));

export default store;
