import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './js/pages/LandingPage';
import UserVerificationPage from './js/pages/UserVerificationPage';
import Home from './js/pages/HomePage';
import OfferListings from './js/pages/OfferListingListPage';
import SeekListings from './js/pages/SeekListingListPage';
import ListingDetails from './js/pages/ListingDetailsPage';
import UserListings from './js/pages/UserListingListPage';
import CategoryListings from './js/pages/CategoryListingListPage';
import AddListing from './js/pages/AddListingPage';
import EditListing from './js/pages/EditListingPage';
import SearchResultsPage from './js/pages/SearchResultsPage';
import ReviewerReviews from './js/pages/ReviewerReviewsPage';
import RevieweeReviews from './js/pages/RevieweeReviewsPage';
import AddReview from './js/pages/AddReviewPage';
import EditReview from './js/pages/EditReviewPage';
import Admin from './js/pages/AdminPage';
import Profile from './js/pages/ProfilePage';
import EditProfile from './js/pages/EditProfilePage';
import EditProfilePicture from './js/pages/EditProfilePicturePage';
import ForgotPasswordPage from './js/pages/ForgotPasswordPage';
import ResetPasswordPage from './js/pages/ResetPasswordPage';
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
    <Route path="profile/edit/picture" component={EditProfilePicture} onEnter={checkLoggedInStatus} />
    <Route path="users/:id" component={Profile} onEnter={checkLoggedInStatus} />
    <Route path="listings/seek" component={SeekListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/seek/page/:page" component={SeekListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/offer" component={OfferListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/offer/page/:page" component={OfferListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/add" component={AddListing} onEnter={checkLoggedInStatus} />
    <Route path="listings/categories/:id" component={CategoryListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/categories/:id/page/:page" component={CategoryListings} onEnter={checkLoggedInStatus} />
    <Route path="listings/search" component={SearchResultsPage} onEnter={checkLoggedInStatus} />
    <Route path="listings/:id" component={ListingDetails} onEnter={checkLoggedInStatus} />
    <Route path="listings/:id/edit" component={EditListing} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/listings" component={UserListings} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/listings/page/:page" component={UserListings} onEnter={checkLoggedInStatus} />
    <Route path="reviews/:id/edit" component={EditReview} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewer/:id" component={ReviewerReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewer/:id/page/:page" component={ReviewerReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewee/:id" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="reviews/reviewee/:id/page/:page" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/reviews" component={RevieweeReviews} onEnter={checkLoggedInStatus} />
    <Route path="users/:id/reviews/add" component={AddReview} onEnter={checkLoggedInStatus} />
    <Route path="admin" component={Admin} onEnter={checkAdmin} />
    <Route path="logout" onEnter={logout} />
    <Route path="forgotpassword" component={ForgotPasswordPage} onEnter={checkLoggedInStatus} />
    <Route path="resetpassword" component={ResetPasswordPage} onEnter={checkLoggedInStatus} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
