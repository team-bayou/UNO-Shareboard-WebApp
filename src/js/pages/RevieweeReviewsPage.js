import React, { Component } from 'react';
import ReviewsPage from './ReviewsPage';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import LoadingNotification from '../components/LoadingNotification';

import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

export default class RevieweeReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      createReview: '',
      backToAd: '',
      userNotFound: false
    };
  }

  componentDidMount() {
    // If reviews list is yours, just show 'Your' as name.
    if (this.props.params.id + "" === utils.getCookie(constants.COOKIE_A) + "") {
      this.setState({
        name: "Your"
      });
    }
    // Otherwise, fetch account name of reviewee and show his name.
    else {
      // Try to get a user.
      api.getUserByID(this.props.params.id, function(exists, response) {
        if (exists && response) {
          this.setState({
            name: response.data.accountName + "'s",
            createReview: (
              <a href={"/users/" + this.props.params.id + "/reviews/add"} className="button-success uk-button uk-button-large center">Review this user</a>
            ),
            backToAd: (
              <a href={"/users/" + this.props.params.id} className="uk-button uk-button-secondary uk-button-large">
                <span data-uk-icon="icon: arrow-left; ratio: 2"></span> Back
              </a>
            )
          });
        }
        else {
          this.setState({
            userNotFound: true
          });
        }
      }.bind(this));
    }
  }

  render() {
    if (this.state.userNotFound)
      return (
        <div id="reviews" className="app">
          <AppHeader />
          <div className="app-body uk-container uk-text-center">
            <div className="uk-margin-medium-top uk-margin-medium-bottom">The user whose reviews you were looking for does not exist</div>
          </div>
          <AppFooter />
        </div>
      );

    else if (!this.state.name)
      return (<LoadingNotification />);

    return (
      <ReviewsPage id={this.props.params.id} page={this.props.params.page} isReviewer={false}
        headerText={this.state.name + " Received"} createReview={this.state.createReview} backToAd={this.state.backToAd}/>
    );
  }
}
