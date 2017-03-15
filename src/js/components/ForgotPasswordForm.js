import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../../css/styles.css';

const utilities = require('../utility/utilities');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;
    this.emailExists = true;
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
      utilities.checkForExistingEmail(this.state.email, function(emailExists) {
        if (!emailExists) {
            this.emailExists = false;
            this.setState({
              emailStyle: this.inputInvalid
            });
        }

        else {
          // send the e-mail
          console.log("e-mail sent");
          this.setState({
            emailSent: true
          });
        }
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
    if (this.state.email === "") {
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
          <p>An e-mail has been sent to the provided e-mail address with instructions on how to reset your password.</p>
        </div>
      );
    }

    else {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend landing-header">Forgot Password</legend>
            <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all fields are filled out</label>
            <div className="uk-margin">
              <label className="uk-form-label uk-text-center">Enter the e-mail address that you registered with below and we will send you a link to reset your password</label>
            </div>
            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="email" className={this.state.emailStyle} type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.emailExists}>No account exists with that e-mail</label>
            </div>
            <div className="uk-margin">
              <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Submit">Submit</button>
            </div>
          </fieldset>
        </form>
      );
    }
  }
}
