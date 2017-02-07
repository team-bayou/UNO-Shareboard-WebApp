import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './js/LandingPage';
import App from './js/components/App';
import NotFound from './js/NotFound';
import './css/styles.css';

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={LandingPage} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
