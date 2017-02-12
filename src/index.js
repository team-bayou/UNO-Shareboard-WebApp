import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import LandingPage from './js/LandingPage';
import App from './js/components/App';
import Advertisements from './js/pages/AdvertisementsPage';
import NotFound from './js/NotFound';
import './css/styles.css';

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={LandingPage} />
    <Route path="advertisements" component={Advertisements} />
    <Route path="app" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
