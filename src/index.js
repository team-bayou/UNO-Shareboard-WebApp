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

const cookie = require('react-cookie');
const utilities = require('./js/utility/utilities');

/*
if (!cookie.load("a") || !cookie.load("b") || !cookie.load("c")) {
  console.log("never before visited");
  utilities.bakeCookies("pawka");
}
else {
  console.log(cookie.load("a"));
  console.log(cookie.load("b"));
  console.log(cookie.load("c"));
}
*/

function verifyLoggedIn(nextState, replace, callback) {
  if (!cookie.load("a") || !cookie.load("b") || !cookie.load("c")) {
    console.log("never before visited");
    utilities.bakeCookies("pawka");
    replace("/");
  }
  callback();
}

function verifyNotLoggedIn(nextState, replace, callback) {
  if (cookie.load("a") && cookie.load("b") && cookie.load("c")) {
    console.log("already logged in");
    replace("home");
  }
  callback();
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Landing} onEnter={verifyNotLoggedIn} />
    <Route path="home" component={Home} onEnter={verifyLoggedIn} />
    <Route path="advertisements" component={Advertisements} onEnter={verifyLoggedIn} />
    <Route path="advertisements/:id" component={AdvertisementDetails} onEnter={verifyLoggedIn} />
    <Route path="users/:account_name/reviews" component={Reviews} onEnter={verifyLoggedIn} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
