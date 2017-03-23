import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import ReviewList from '../components/reviews/ReviewList';

export default class ReviewsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      reviews: null
    };

    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    // Try to get a list of reviewer's reviews.
    if (this.props.reviewer) {
      api.getReviewerReviews(this.props.id, this.callback);
    }
    // Try to get a list of reviewee's reviews.
    else {
      api.getRevieweeReviews(this.props.id, this.callback);
    }
  }

  callback(exists, response) {
    if (exists && response){
      this.setState({
        reviews: response.data
      });
    }
    else {
      console.log("No reviews found");
    }
  }

  render() {
    if (!this.state.reviews)
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="reviews" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{this.props.headerText + " reviews (" + this.state.reviews.length + ")"}</span></h2>
          {this.props.createReview}
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}
