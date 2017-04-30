import api from '../utility/api';
import utils from '../utility/utilities';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import ReviewPageList from '../components/reviews/ReviewPaginationList';
import LoadingNotification from '../components/LoadingNotification';

export default class ReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.page ? this.props.page : 1,
      pages: -1,
      reviews: [],
      totalNumReviews: 0
    };

    this.callback = this.callback.bind(this);
    this.callbackByPage = this.callbackByPage.bind(this);
  }

  componentDidMount() {
    if (this.props.isReviewer) {
      // Try to get a list of reviewer's reviews and extract length.
      api.getReviewerReviews(this.props.id, this.callback);

      // Try to get a list of reviewer's reviews by page number.
      api.getReviewerReviewsByPage(this.props.id, this.state.currentPage, this.callbackByPage);
    }
    else {
      // Try to get a list of reviewee's reviews and extract length.
      api.getRevieweeReviews(this.props.id, this.callback);

      // Try to get a list of reviewee's reviews by page number.
      api.getRevieweeReviewsByPage(this.props.id, this.state.currentPage, this.callbackByPage);
    }
  }

  callback(exists, response) {
    if (exists && response) {
      // Determine number of pages based on the number of reviews.
      this.setState({
        pages: utils.getNumberOfPages(response.data.length),
        totalNumReviews: response.data.length
      });
    }
  }

  callbackByPage(exists, response) {
    if (exists && response) {
      this.setState({
        reviews: response.data
      });
    }
  }

  render() {
    if (this.state.pages < 0 || !this.state.reviews)
      return (<LoadingNotification />);

    let resource = this.props.isReviewer ? "reviews/reviewer/" : "reviews/reviewee/";

    return (
      <div id="reviews" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{this.props.headerText + " Reviews (" + this.state.reviews.length + ")"}</span></h2>
          {
            !!this.props.createReview ?
            <div className="uk-margin-medium-top uk-margin-medium-bottom center" data-uk-grid>
              {this.props.createReview}
            </div> : null
          }
          <ReviewPageList reviews={this.state.reviews} isReviewer={this.props.isReviewer} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={resource + this.props.id} userID={this.props.id} edit={this.props.edit}/>
        </div>
        <AppFooter />
      </div>
    );
  }
}
