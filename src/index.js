import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Landing from './js/pages/LandingPage';
import UserVerificationPage from './js/pages/UserVerificationPage';
import Home from './js/pages/HomePage';
import Advertisements from './js/pages/AdvertisementListPage';
import AdvertisementDetails from './js/pages/AdvertisementDetailsPage';
import AddAdvertisement from './js/pages/AddAdvertisementPage';
import UserAdvertisements from './js/pages/UserAdvertisementListPage';
import CategoryAdvertisements from './js/pages/CategoryAdvertisementListPage';
import Reviews from './js/pages/ReviewsPage';
import NotFound from './js/pages/NotFoundPage';
import './css/styles.css';

const utilities = require('./js/utility/utilities');

function checkLoggedInStatus(nextState, replace, callback) {
  utilities.verifyCookies(nextState.routes[0].path, replace, callback);
}

function logout(nextState, replace, callback) {
  utilities.clearCookies();
  replace("/");
  callback();
}

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Landing} onEnter={checkLoggedInStatus} />
    <Route path="verify" component={UserVerificationPage} onEnter={checkLoggedInStatus} />
    <Route path="home" component={Home} onEnter={checkLoggedInStatus} />
    <Route path="advertisements" component={Advertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/add" component={AddAdvertisement} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/categories/:id" component={CategoryAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/:id" component={AdvertisementDetails} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/advertisements" component={UserAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/reviews" component={Reviews} onEnter={checkLoggedInStatus} />
    <Route path="logout" onEnter={logout} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
