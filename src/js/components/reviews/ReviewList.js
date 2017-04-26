import React, { Component } from 'react';
import Review from './Review';

export default class ReviewList extends Component {
  render() {
    var reviews = this.props.reviews.map(
      review => <Review key={review.id} review={review} isReviewer={this.props.isReviewer} edit={this.props.edit}/>
    );

    return (
      <div className="review-list">
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" data-uk-grid>
          {reviews}
        </div>
      </div>
    );
  }
}
