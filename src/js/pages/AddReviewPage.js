import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import ReviewForm from '../components/reviews/ReviewForm';
import AppFooter from '../components/AppFooter';

export default class AddReviewPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      review: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.callback = this.callback.bind(this);
  }

  componentDidMount(){
    // If user wants to edit his/her review, fetch it by id.
    if (this.props.edit){
      api.getReview(this.props.id, function(exists, response){
        if (exists && response){
          // Check if the current user is allowed to edit the requested review, i.e.
          // check if he/she is the reviewer of that review.
          if (response.data.reviewer.id === parseInt(utils.getCookie(constants.COOKIE_A), 10)){
            this.setState({
              review: response.data
            });
          } else {
            browserHistory.goBack();
          }
        } else {
          console.log("No review found");
        }
      }.bind(this));
    }
  }

  handleSubmit(data){
    if (!this.props.edit){
      // Try to add new review.
      api.addReview(data, this.callback);
    } else {
      // Try to update existing review.
      api.updateReview(data, this.callback);
    }
  }

  callback(exists, response){
    if (exists && response){
      let routeBack;
      if (!this.props.edit){
        // Get user id from parameters.
        // Redirect to page of user's reviews.
        routeBack = "/users/" + this.props.params.id + "/reviews";
      } else {
        // Redirect to page of reviewer's reviews.
        routeBack = "/reviews/reviewer/" + this.state.review.reviewer.id;
      }
      browserHistory.push(routeBack);
    } else {
      console.log("Failed to create/update review.");
    }
  }

  render() {
    if (this.props.edit && !this.state.review)
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="review-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>{!this.props.edit ? "Review User" : "Edit Review of User '" + this.state.review.reviewee.accountName + "'"}</span>
          </h2>
          <ReviewForm id={this.props.id} review={this.state.review} reviewerId={utils.getCookie(constants.COOKIE_A)}
            revieweeId={!this.props.edit ? this.props.params.id : this.state.review.reviewee.id} handleSubmit={this.handleSubmit} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
