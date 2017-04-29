import React, { Component } from 'react';
import Star from './Star';
import EditButton from '../buttons/EditButton';

import placeholder from '../../../media/images/avatar_placeholder.png';

const utils = require('../../utility/utilities');
const constants = require('../../utility/constants');

export default class Review extends Component {
  render() {
    // Get user whose name will be shown.
    var user = this.props.isReviewer ? this.props.review.reviewee : this.props.review.reviewer;
    var routeToUser = "/users/" + user.id;

    return (
      <div id={"review-" + this.props.review.id} className="review">
        <article className="uk-comment uk-background-muted">
          <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
            <div className="uk-width-auto">
              <img className="ad-owner-image uk-comment-avatar" src={!!user.imageId ? constants.HOST + "/service/v1/images/get/" + user.imageId : placeholder} width="80" height="80" alt="" />
            </div>
            <div className="uk-width-expand">
              <h4 className="review-author uk-comment-title uk-margin-remove"><a className="uk-link-reset" href={routeToUser}>{user.accountName}</a></h4>
              <p className="review-time-published uk-margin-remove">{this.props.review.timePublished}</p>
              <p className="review-rating uk-margin-remove">{this.getRating()}</p>
            </div>
          </header>
          <div className="uk-comment-body">
            <p>{this.props.review.comments}</p>
          </div>
          {
            this.props.review.reviewer.id + "" === utils.getCookie(constants.COOKIE_A) + "" ?
            <div className="uk-float-right" title="Edit Review" data-uk-tooltip>
              <EditButton href={"/reviews/" + this.props.review.id + "/edit"} />
            </div>
            :
            null
          }
        </article>
      </div>
    );
  }

  getRating() {
    var rating = [];

    for (var i = 0; i < parseInt(this.props.review.rating, 10); i++)
      rating.push(<Star key={i} />);

    return rating;
  }
}
