import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import App from './App';

ReactDOM.render(
  <Router history={history}>
  <Switch>
      <Route path="/" component={App} />
  </Switch>
</Router>,
  document.getElementById('root')
);


