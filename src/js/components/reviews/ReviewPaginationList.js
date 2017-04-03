import React, { Component } from 'react';
import ReviewList from './ReviewList';
import Paginator from '../Paginator';

export default class ReviewPaginationList extends Component {
  render(){
    let paginator = this.props.pages > 1 ?
      <Paginator pages={this.props.pages} currentPage={this.props.currentPage} resource={this.props.resource}/>
      :
      '';

    return (
      <div>
        <div className="uk-margin-small-bottom">
          {paginator}
        </div>
        <ReviewList reviews={this.props.reviews} isReviewer={this.props.isReviewer}/>
        <div className="uk-margin-medium-top">
          {paginator}
        </div>
      </div>
    );
  }
}
