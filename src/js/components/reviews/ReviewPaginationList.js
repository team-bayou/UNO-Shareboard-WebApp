import React, { Component } from 'react';
import ReviewList from './ReviewList';
import Paginator from '../Paginator';

import utils from '../../utility/utilities';
import constants from '../../utility/constants';

export default class ReviewPaginationList extends Component {
  render() {
    let paginator = this.props.pages > 1 ?
      <Paginator pages={this.props.pages} currentPage={this.props.currentPage} resource={this.props.resource}/>
      :
      null;

    let msg = "";
    if (window.location.pathname.includes("reviewer"))
      msg = "You have not submitted any reviews";
    else
      if (this.props.userID + "" === utils.getCookie(constants.COOKIE_A))
        msg = "You have not received any reviews";
      else
        msg = "This user has not received any reviews";

    return (
      <div>
        <div className="uk-margin-small-bottom">
          {paginator}
        </div>
        {
          this.props.pages < 1 ?
          <div className="uk-margin-medium-top uk-text-center">
            {msg}
          </div>
          : null
        }
        <ReviewList reviews={this.props.reviews} isReviewer={this.props.isReviewer} edit={this.props.edit}/>
        <div className="uk-margin-medium-top">
          {paginator}
        </div>
      </div>
    );
  }
}
