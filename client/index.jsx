import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import App from './components/app.jsx';
import Landing from './components/landing.jsx'
import Home from './components/home.jsx'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Landing} />
        <Route path="home" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
