import React, { Component } from 'react';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;
    this.emailValid = true;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.textareaValid = "uk-textarea";
    this.textareaInvalid = "uk-textarea uk-form-danger";

    this.state = {
      loaded: false,
      userID: '',
      description: "",
      descriptionStyle: this.textareaValid,

      submissionSuccessful: false,
      submissionFailed: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    utils.verifyLoggedIn(utils.getCookie(constants.COOKIE_A), function(loggedIn) {
      if (loggedIn) {
        utils.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
          if (exists) {
            this.setState({
              userID: response.data.id
            });
          }
          this.setState({
            loaded: true
          });
        }.bind(this));
      }
      else {
        this.setState({
          loaded: true
        });
      }
    }.bind(this));
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
      let data = {
        reportingUserId: this.state.userID,
        comments: this.state.description
      };
      api.submitReport(data, function(success, response) {
        console.log(response);
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
    if (this.state.loaded) {

      if (this.state.submissionSuccessful) {
        return (
          <div className="uk-text-center">
            <p>Thank you! Your report has successfully been submitted.</p>
            <p>We'll check it as soon as possible.</p>
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
                  <p>There was a problem submitting your report. Please try again or e-mail us if the problem continues.</p>
                </div>
                : null
              }

              <div className="uk-margin">
                <label className="uk-form-label form-label" htmlFor="description">Description of your problem <span className="label-invalid">*</span></label>
                <div className="uk-form-controls">
                  <textarea name="description" id="description" className={this.state.descriptionStyle} rows="5" onChange={this.handleInputChange} />
                </div>
                <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure you fill our the description of your problem</label>
              </div>

              <div className="uk-margin">
                <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Submit">Submit</button>
              </div>

              <div className="uk-margin-top uk-text-center">
                <a href="/">Home</a>
              </div>

            </fieldset>
          </form>
        );
      }
    }

    else {
      return (<div className="uk-text-center">Loading...</div>);
    }
  }

}