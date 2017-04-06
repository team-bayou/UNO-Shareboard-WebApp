import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Rating from './Rating';

export default class ReviewForm extends Component {
  constructor(props){
    super(props);

    this.emptyFields = false;
    this.ratingValid = "uk-form-controls";
    this.ratingInvalid = "uk-form-controls rating-invalid";

    this.state = {
      id: this.props.review ? this.props.review.id : '',
      rating: this.props.review ? this.props.review.rating : '',
      comments: this.props.review ? this.props.review.comments : '',
      reviewer: this.props.review ? this.props.review.reviewer.id : this.props.reviewerId,
      reviewee: this.props.review ? this.props.review.reviewee.id : this.props.revieweeId,
      timePublished: /* this.props.review ? this.props.review.timePublished : */ new Date(Date.now()).toISOString(),
      ratingStyle: this.ratingValid,
      commentsStyle: ''
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRatingChange(value) {
    if (value > 0 && value <= 5){
      this.setState({
        rating: value
      });

      this.resetError("rating", value);
    }
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

  handleSubmit(event){
    event.preventDefault();

    this.checkForEmptyFields();

    if (!this.emptyFields){
      this.props.handleSubmit(this.state);
    }
  }

  checkForEmptyFields() {
    let data = this.state;

    if (data.rating === '') {
      this.emptyFields = true;
    } else {
      this.emptyFields = false;
    }

    let rs = data.rating === '' ? this.ratingInvalid : this.ratingValid;

    this.setState({
      ratingStyle: rs
    });
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetError(name, value) {
    let style;
    if (name === 'rating'){
      style = value === '' ? this.ratingInvalid : this.ratingValid;
    }

    this.setState({
      [name + 'Style']: style
    });
  }

  render() {
    return (
      <div>
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>
            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label label-invalid" htmlFor="review-rating" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>
                  <label className="uk-form-label" htmlFor="review-rating">Rating</label>
                  <div className={this.state.ratingStyle}>
                    <Rating onClick={this.handleRatingChange} rating={this.state.rating}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="review-comments">Comments</label>
                  <div className="uk-form-controls">
                    <textarea className="uk-textarea" id="review-comments"
                      placeholder="The textual comments giving to the user" name="comments"
                      value={this.state.comments} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1-4 uk-align-center">
              <div className="uk-margin-medium-top">
                <button className="button-success uk-button uk-button-large uk-width-1-1" type="submit" value="Submit">Submit</button>
              </div>
              <div className="uk-margin-small-top">
                <a onClick={browserHistory.goBack} className="uk-button uk-button-danger uk-button-large uk-width-1-1">Cancel</a>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
