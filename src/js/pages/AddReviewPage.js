import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import ReviewForm from '../components/reviews/ReviewForm';
import AppFooter from '../components/AppFooter';

export default class AddReviewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: null,
      reviewedUser: null
    };
  }

  componentDidMount() {
    // If user wants to edit his/her review, fetch it by id.
    if (this.props.edit) {
      api.getReview(this.props.id, function(exists, response) {
        if (exists && response) {
          // Check if the current user is allowed to edit the requested review, i.e.
          // check if he/she is the reviewer of that review.
          if (response.data.reviewer.id === parseInt(utils.getCookie(constants.COOKIE_A), 10)) {
            this.setState({
              review: response.data
            });
          } else {
            browserHistory.goBack();
          }
        } else {
          browserHistory.push("/reviews/reviewer/" + utils.getCookie(constants.COOKIE_A));
        }
      }.bind(this));
    }
    else {
      api.getUserByID(this.props.params.id, function(exists, response) {
        if (exists) {
          this.setState({
            reviewedUser: response.data
          });
        }
        else {
          this.setState({
            reviewedUser: -1
          });
        }
      }.bind(this));
    }
  }

  render() {
    if ((this.props.edit && !this.state.review) || (!this.props.edit && !this.state.reviewedUser))
      return (<div className="uk-text-center">Loading...</div>);

    if (this.state.reviewedUser === -1) {
      return (
        <div id="review-add" className="app">
          <AppHeader />
            <div className="app-body uk-container uk-text-center">
              <div className="uk-margin-medium-top uk-margin-medium-bottom">The user you are trying to review does not exist.</div>
            </div>
          <AppFooter />
        </div>
      );
    }

    return (
      <div id="review-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>{!this.props.edit ? "Review " + this.state.reviewedUser.accountName : "Edit review of " + this.state.review.reviewee.accountName}</span>
          </h2>
          <ReviewForm id={this.props.id} review={this.state.review} reviewerId={utils.getCookie(constants.COOKIE_A)}
            revieweeId={!this.props.edit ? this.props.params.id : this.state.review.reviewee.id} edit={this.props.edit} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
