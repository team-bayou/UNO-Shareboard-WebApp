import React, { Component } from 'react';
import ReviewsPage from './ReviewsPage';

export default class RevieweeReviewsPage extends Component {
  render() {
    return (
      <ReviewsPage id={this.props.params.id} reviewer={false} headerText={"received"}/>
    );
  }
}
