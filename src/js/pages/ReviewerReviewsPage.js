import React, { Component } from 'react';
import ReviewsPage from './ReviewsPage';

export default class ReviewerReviewsPage extends Component {
  render() {
    return (
      <ReviewsPage id={this.props.params.id} page={this.props.params.page}
        isReviewer={true} headerText={"Your submitted"} edit={true}/>
    );
  }
}
