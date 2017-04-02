import React, { Component } from 'react';
import ReviewList from './ReviewList';
import Pagination from '../Pagination';

export default class ReviewPaginationList extends Component {
  render(){
    let pagination = this.props.pages > 1 ?
      <Pagination pages={this.props.pages} currentPage={this.props.currentPage} resource={this.props.resource}/>
      :
      '';

    return (
      <div>
        <div className="uk-margin-small-bottom">
          {pagination}
        </div>
        <ReviewList reviews={this.props.reviews} isReviewer={this.props.isReviewer}/>
        <div className="uk-margin-small-top">
          {pagination}
        </div>
      </div>
    );
  }
}
