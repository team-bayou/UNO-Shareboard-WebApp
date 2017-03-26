import React, { Component } from 'react';
import ReviewsPage from './ReviewsPage';

export default class ReviewerReviewsPage extends Component {
  render() {
    return (
      <ReviewsPage id={this.props.params.id} isReviewer={true} headerText={"Your submitted"}/>
    );
  }
}
