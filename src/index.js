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

ReactDOM.render((
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Landing} />
    <Route path="home" component={Home} />
    <Route path="advertisements" component={Advertisements} />
    <Route path="advertisements/:id" component={AdvertisementDetails} />
    <Route path="users/:account_name/reviews" component={Reviews} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('container'));
