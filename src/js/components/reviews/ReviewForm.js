import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Rating from './Rating';

import api from '../../utility/api';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;
    this.ratingValid = "uk-form-controls";
    this.ratingInvalid = "uk-form-controls rating-invalid";

    this.errorMsg = "";

    this.state = {
      id: this.props.review ? this.props.review.id : '',
      rating: this.props.review ? this.props.review.rating : '',
      comments: this.props.review ? this.props.review.comments : '',
      reviewer: this.props.review ? this.props.review.reviewer.id : this.props.reviewerId,
      reviewee: this.props.review ? this.props.review.reviewee.id : this.props.revieweeId,
      ratingStyle: this.ratingValid,
      commentsStyle: '',

      submissionFailed: false
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  handleRatingChange(value) {
    if (value > 0 && value <= 5) {
      this.setState({
        rating: value
      });

      this.resetError("rating", value);
    }
  }

  handleCancel() {
    browserHistory.push("/users/" + (this.props.review ? this.props.review.reviewee.id : this.props.revieweeId));
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });

    // We reset the error message of each field
    //   so that there isn't any kind of weird interactions
    //   between empty field errors and invalid value errors.
    this.resetError(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.submitreviewbtn.setAttribute("disabled", "disabled");

      if (!this.props.edit) {
        api.addReview(this.state, function(exists, response) {
          if (exists && response) {
            let routeBack = this.props.edit ?
                "/reviews/reviewer/" + this.props.review.reviewer.id :
                "/users/" + this.props.revieweeId + "/reviews";

            browserHistory.push(routeBack);
          }
          else {
            this.setState({
              submissionFailed: true
            });
            this.errorMsg = "There was a problem when creating your review. Please try again, or contact us if the problem continues.";
            this.refs.submitreviewbtn.removeAttribute("disabled");
          }
        }.bind(this));
      }

      else {
        api.updateReview(this.state, function(exists, response) {
          if (exists && response) {
            let routeBack = this.props.edit ?
                "/reviews/reviewer/" + this.props.review.reviewer.id :
                "/users/" + this.props.revieweeId + "/reviews";

            browserHistory.push(routeBack);
          }
          else {
            this.setState({
              submissionFailed: true
            });
            this.errorMsg = "There was a problem when updating your review. Please try again, or contact us if the problem continues.";
            this.refs.submitreviewbtn.removeAttribute("disabled");
          }
        }.bind(this));
      }

    }
  }

  checkForEmptyFields() {
    let data = this.state;

    this.emptyFields = data.rating === '';

    let rs = data.rating === '' ? this.ratingInvalid : this.ratingValid;

    this.setState({
      ratingStyle: rs
    });
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetError(name, value) {
    let style;
    if (name === 'rating') {
      style = value === '' ? this.ratingInvalid : this.ratingValid;
    }

    this.setState({
      [name + 'Style']: style
    });
  }

  deleteReview() {
    this.refs.deletereviewbtn.setAttribute("disabled", "disabled");
    api.deleteReview(this.state.id, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        this.setState({
          submissionFailed: true
        });
        this.errorMsg = "There was a problem deleting this review. Please try again, or contact us if the problem continues.";
        this.refs.deletereviewbtn.removeAttribute("disabled");
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>
            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  {
                    this.emptyFields ?
                    <div className="uk-alert-danger uk-text-center" data-uk-alert>
                      <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
                    </div>
                    : null
                  }
                  {
                    this.state.submissionFailed ?
                    <div className="uk-alert-danger uk-text-center" data-uk-alert>
                      <p><span data-uk-icon="icon: warning"></span> {this.errorMsg}</p>
                    </div>
                    : null
                  }
                  <label className="uk-form-label form-label" htmlFor="review-rating">Rating <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <Rating onClick={this.handleRatingChange} rating={this.state.rating}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="review-comments">Comments</label>
                  <div className="uk-form-controls">
                    <textarea className="uk-textarea" id="review-comments"
                      placeholder="Any comments you want to make with the review" name="comments"
                      value={this.state.comments} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1-3@s uk-width-1-4@m uk-align-center">
              <div className="uk-margin-medium-top">
                <button ref="submitreviewbtn" className="button-success uk-button uk-button-large uk-width-1-1" type="submit" value="Submit">Submit</button>
              </div>
              <div className="uk-margin-small-top">
                <a onClick={this.handleCancel} className="uk-button uk-button-danger uk-button-large uk-width-1-1">Cancel</a>
              </div>
              {
                this.props.review ?
                <div className="uk-margin-small-top">
                  <a href="#confirm-delete-review" className="uk-button uk-button-secondary uk-button-large uk-width-1-1" data-uk-toggle>Delete Review</a>
                </div>
                : null
              }
            </div>
          </fieldset>
        </form>
        {
          this.props.review ?
          <div id="confirm-delete-review" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body uk-text-center">
              <p>Are you sure you want to delete this review?<br />This cannot be undone.</p>
              <p className="uk-text-right">
                <button ref="deletereviewbtn" className="uk-button uk-button-secondary" type="button" onClick={this.deleteReview}>Yes</button>
                <button className="uk-button uk-button-default uk-modal-close" type="button">No</button>
              </p>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}
