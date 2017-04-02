import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './js/pages/LandingPage';
import UserVerificationPage from './js/pages/UserVerificationPage';
import Home from './js/pages/HomePage';
import Advertisements from './js/pages/AdvertisementListPage';
import AdvertisementDetails from './js/pages/AdvertisementDetailsPage';
import UserAdvertisements from './js/pages/UserAdvertisementListPage';
import CategoryAdvertisements from './js/pages/CategoryAdvertisementListPage';
import AddAdvertisement from './js/pages/AddAdvertisementPage';
import ReviewerReviews from './js/pages/ReviewerReviewsPage';
import RevieweeReviews from './js/pages/RevieweeReviewsPage';
import AddReview from './js/pages/AddReviewPage';
import Admin from './js/pages/AdminPage'
import Profile from './js/pages/ProfilePage';
import EditProfile from './js/pages/EditProfilePage';
import NotFound from './js/pages/NotFoundPage';
import './css/styles.css';

const utilities = require('./js/utility/utilities');

function checkLoggedInStatus(nextState, replace, callback) {
  utilities.verifyCookies(nextState.routes[0].path, replace, callback);
}

function checkAdmin(nextState, replace, callback) {
  utilities.verifyAdmin(function(loggedIn, isAdmin) {
    if (!loggedIn) {
      utilities.clearCookies();
      replace("/");
    }
    else if (loggedIn && !isAdmin) {
      replace("/home");
    }
    callback();
  });
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
    <Route path="profile" component={Profile} onEnter={checkLoggedInStatus} />
    <Route path="profile/edit" component={EditProfile} onEnter={checkLoggedInStatus} />
    <Route path="users/:id" component={Profile} onEnter={checkLoggedInStatus} />
    <Route path="advertisements" component={Advertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/page/:page" component={Advertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/add" component={AddAdvertisement} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/categories/:id" component={CategoryAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/categories/:id/page/:page" component={CategoryAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="advertisements/:id" component={AdvertisementDetails} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/advertisements" component={UserAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/advertisements/page/:page" component={UserAdvertisements} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewer/:id" component={ReviewerReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewer/:id/page/:page" component={ReviewerReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewee/:id" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewee/:id/page/:page" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/reviews" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/reviews/add" component={AddReview} onEnter={checkLoggedInStatus} />
    <Route path="admin" component={Admin} onEnter={checkAdmin} />
    <Route path="logout" onEnter={logout} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
