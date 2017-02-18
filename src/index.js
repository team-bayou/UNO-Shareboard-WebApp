import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Landing from './js/pages/LandingPage';
import Home from './js/pages/HomePage';
import Advertisements from './js/pages/AdvertisementListPage';
import AdvertisementDetails from './js/pages/AdvertisementDetailsPage';
import Reviews from './js/pages/ReviewsPage';
import NotFound from './js/pages/NotFoundPage';
import './css/styles.css';

const utilities = require('./js/utility/utilities');
const constants = require('./js/utility/constants');

function checkLoggedInStatus(nextState, replace, callback) {
  utilities.verifyCookies(utilities.getCookie(constants.COOKIE_A), nextState.routes[0].path, replace, callback);
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Landing} onEnter={checkLoggedInStatus} />
    <Route path="home" component={Home} onEnter={checkLoggedInStatus} />
    <Route path="advertisements" component={Advertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/:id" component={AdvertisementDetails} onEnter={checkLoggedInStatus} />
    <Route path="users/:account_name/reviews" component={Reviews} onEnter={checkLoggedInStatus} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
