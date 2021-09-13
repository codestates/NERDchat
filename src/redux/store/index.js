import {compose, createStore, applyMiddleWare} from 'redux';
import reducer from '../reducer/index';
import redux_thunk from 'redux-thunk'

// const dev = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(reducer, applyMiddleware(redux_thunk));


export default store;