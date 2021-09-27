import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App/App";
import {rootReducer} from './services/reducers/index';
import thunk from 'redux-thunk';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
