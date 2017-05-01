import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReviewsPage from './ReviewsPage';

import constants from '../utility/constants';
import utils from '../utility/utilities';

export default class ReviewerReviewsPage extends Component {
  constructor(props) {
    super(props);

    if (props.params.id + "" !== utils.getCookie(constants.COOKIE_A) + "")
      browserHistory.push("/home");
  }

  render() {
    return (
      <ReviewsPage id={this.props.params.id} page={this.props.params.page}
        isReviewer={true} headerText={"Your Submitted"} edit={true} />
    );
  }
}
