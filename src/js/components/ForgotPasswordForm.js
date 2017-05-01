import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;
    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.state = {
      email: '',
      emailStyle: this.inputValid,

      emailSent: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.resetErrors();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.forgotpassbtn.setAttribute("disabled", "disabled");

      utilities.submitForgotPassword(this.state.email, function(success, response) {
        this.setState({
          emailSent: true
        });
        this.refs.forgotpassbtn.removeAttribute("disabled");
      }.bind(this));
    }
  }

  resetErrors() {
    this.emailExists = true;
    this.emptyFields = false;
    this.setState({
      emailStyle: this.inputValid
    });
  }

  checkForEmptyFields() {
    if (this.state.email === "" || !utilities.validateEmail(this.state.email)) {
      this.emptyFields = true;

      this.setState({
        emailStyle: this.inputInvalid
      });
    }
  }

  render() {

    if (this.state.emailSent) {
      return (
        <div className="uk-text-center">
          <h2 className="uk-heading-line uk-text-center"><span>E-mail Sent</span></h2>
          <p>If an account exists with the provided e-mail address, you should receive an e-mail with instructions on how to reset your password.</p>
          <p className="uk-margin-remove-bottom"><a href="/">Back to Login</a></p>
        </div>
      );
    }

    else {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <legend className="uk-legend landing-header">Forgot Password</legend>

            <div className="uk-margin">
              <label className="uk-form-label uk-text-center">Enter the e-mail address that you registered with and we will send you instructions on how to reset your password.</label>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="email">E-mail <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <input id="email" name="email" className={this.state.emailStyle} type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure your e-mail is properly filled in</label>
            </div>

            <div className="uk-margin">
              <button ref="forgotpassbtn" className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Submit">Submit</button>
            </div>

            <div className="uk-margin-top uk-margin-remove-bottom uk-text-center">
              <a href="/">Back to Login</a>
            </div>

          </fieldset>
        </form>
      );
    }
  }
}
