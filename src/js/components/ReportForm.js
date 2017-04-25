import React, { Component } from 'react';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

export default class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;

    this.textareaValid = "uk-textarea";
    this.textareaInvalid = "uk-textarea uk-form-danger";

    this.state = {
      description: "",
      descriptionStyle: this.textareaValid,

      submissionSuccessful: false,
      submissionFailed: false
    }

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

    this.resetErrors();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.resetErrors();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.reportbtn.setAttribute("disabled", "disabled");

      let data = {
        reportingUserId: utils.getCookie(constants.COOKIE_A),
        offendingUserId: this.props.reportedUserID,
        comments: this.state.description
      };

      if (!!this.props.reportedAdID) {
        data.advertisementId = this.props.reportedAdID;
      }

      api.submitReport(data, function(success, response) {
        if (success) {
          this.setState({
            submissionSuccessful: true,
            submissionFailed: false
          });
        }
        else {
          this.setState({
            submissionSuccessful: false,
            submissionFailed: true
          });
          this.refs.reportbtn.removeAttribute("disabled");
        }
      }.bind(this));
    }
  }

  resetErrors() {
    this.emptyFields = false;

    this.setState({
      descriptionStyle: this.textareaValid
    });
  }

  checkForEmptyFields() {
    if (this.state.description === "") {
      this.emptyFields = true;
      this.setState({
        descriptionStyle: this.textareaInvalid
      });
    }
  }

  render() {

    if (this.state.submissionSuccessful) {
      return (
        <div className="uk-text-center">
          <p>Your report has successfully been submitted!<br />We'll review it as soon as possible.</p>
          <p><button className="uk-button uk-button-secondary uk-modal-close" type="button" value="Close">Close</button></p>
        </div>
      );
    }

    else {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            {
              this.state.submissionFailed ?
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p>There was a problem submitting your report.<br />Please try again or e-mail us if the problem continues.</p>
              </div>
              : null
            }

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="description">Tell us why you're reporting this {!!this.props.reportedAdID ? "listing" : "user"}: <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <textarea name="description" id="description" className={this.state.descriptionStyle} rows="5" onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure you fill our your reasoning</label>
            </div>

            <div className="uk-margin uk-text-right">
              <button ref="reportbtn" className="uk-button uk-button-secondary" type="submit" value="Submit">Submit</button>
              <button className="uk-button uk-button-default uk-modal-close" type="button" value="Cancel">Cancel</button>
            </div>

          </fieldset>
        </form>
      );
    }

  }

}
