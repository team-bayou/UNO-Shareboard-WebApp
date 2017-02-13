import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');
const utilities = require('../utility/utilities');
const validatePhone = utilities.validatePhone;

var AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;
var formatter = new AsYouTypeFormatter('US');

export default class UserVerificationForm extends Component {
  constructor(props) {
    super(props);

    this.phoneNumberValid = false;

    this.state = {
      phone: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    if (event.target.name === "phone") {
      this.setState({
        phone: event.target.value
      });
      this.phoneNumberValid = validatePhone(event.target.value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  resetErrors() {
    this.emailExists = true;
    this.passwordCorrect = true;
    this.emptyFields = false;
    this.setState({
      emailStyle: this.inputValid,
      passwordStyle: this.inputValid
    });
  }

  checkForEmptyFields() {

  }

  render() {
    return (
      <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend landing-header">Finalize Registration</legend>

          <label className="uk-form-label label-invalid" hidden={true}>Please make sure all fields are filled out</label>

          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="verify-code" className="uk-input" type="text" placeholder="Verification Code" onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={true}></label>
          </div>

          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="username" className="uk-input" type="text" placeholder="Username" onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={true}></label>
          </div>

          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="first-name" className="uk-input" type="text" placeholder="First Name" onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={true}></label>
          </div>

          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="last-name" className="uk-input" type="text" placeholder="Last Name" onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={true}></label>
          </div>

          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="phone" className="uk-input" type="tel" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.phoneNumberValid}>Not a valid phone number</label>
            <label className="uk-form-label label-invalid" hidden={!this.phoneNumberValid}>Valid phone number</label>
          </div>

          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Login">Login</button>
          </div>

        </fieldset>
      </form>
    );
  }
}
