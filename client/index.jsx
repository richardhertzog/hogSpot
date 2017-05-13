import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/App.jsx';
import reducers from './reducers';

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
