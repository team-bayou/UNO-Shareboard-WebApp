import React, { Component } from 'react';

export default class AddReviewForm extends Component {
  constructor(props){
    super(props);

    this.emptyFields = false;
    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";
    this.selectValid = "uk-select";
    this.selectInvalid = "uk-select uk-form-danger";
    this.radioLabelValid = "";
    this.radioLabelInvalid = "label-invalid";
    this.radioValid = "uk-radio";
    this.radioInvalid = "uk-radio radio-invalid";

    this.state = {
      rating: '',
      comments: '',
      commentsStyle: '',
      reviewer: this.props.reviewerId,
      reviewee: this.props.revieweeId,
      timePublished: new Date(Date.now()).toISOString(),
      ratingStyle: this.inputValid
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

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

    const rs = data.rating === '' ? this.inputInvalid : this.inputValid;

    this.setState({
      ratingStyle: rs
    });
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetError(name, value) {
    let style;
    if (name === 'rating'){
      style = value === '' ? this.inputInvalid : this.inputValid;
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

            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label label-invalid" htmlFor="review-rating" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>
                <label className="uk-form-label" htmlFor="review-rating">Rating</label>
                <div className="uk-form-controls">
                  <input className={this.state.ratingStyle} id="review-rating" type="text" placeholder="The rating of the user" name="rating" onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="review-comments">Comments</label>
                <div className="uk-form-controls">
                  <textarea className="uk-textarea" id="review-comments" placeholder="The textual comments giving to the user" name="comments" onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>

            <div className="uk-width-1-4 uk-align-center">
              <div className="uk-margin-large-top">
                <button className="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-align-center submit-btn" type="submit" value="Submit">Submit</button>
              </div>
            </div>

          </fieldset>
        </form>
      </div>
    );
  }
}
