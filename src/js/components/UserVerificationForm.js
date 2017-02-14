import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');
const utilities = require('../utility/utilities');
const validatePhone = utilities.validatePhone;

export default class UserVerificationForm extends Component {
  constructor(props) {
    super(props);

    this.emailValid = true;
    if (!props.email) {
      // We also have check to see if the e-mail
      //   exists in the database and hasn't already
      //   been verified.
      this.emailValid = false;
    }

    this.emptyFields = false;
    this.usernameValid = true;
    this.phoneNumberValid = true;
    this.passwordCorrect = true;
    this.verificationCorrect = true;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.state = {
      verifycode: '',
      password: '',
      username: '',
      firstname: '',
      lastname: '',
      phone: '',

      verifycodeStyle: this.inputValid,
      passwordStyle: this.inputValid,
      usernameStyle: this.inputValid,
      firstnameStyle: this.inputValid,
      lastnameStyle: this.inputValid,
      phoneStyle: this.inputValid
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

    if (name === "verifycode") {
      const vs = value === "" && this.emptyFields ? this.inputInvalid : this.inputValid;
      this.setState({
        verifycodeStyle: vs
      });
    }

    else if (name === "username") {
      const us = value.length < 3 ? this.inputInvalid : this.inputValid;
      this.usernameValid = us === this.inputValid;
      this.setState({
        usernameStyle: us
      });
    }

    else if (name === "password") {
      const ps = value === "" && this.emptyFields ? this.inputInvalid : this.inputValid;
      this.setState({
        passwordStyle: ps
      });
    }

    else if (name === "phone") {
      const phs = value === "" || validatePhone(value) ? this.inputValid : this.inputInvalid;
      this.phoneNumberValid = phs === this.inputValid;
      this.setState({
        phoneStyle: phs
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetErrors();

    // We want to make this check before doing a catch-all check for empty
    //   fields because if we do this check afterwards, it will have the
    //   chance to reset the error of the username field if it is in
    //   fact empty due to this check setting the username field to
    //   "valid" if it is empty.
    // The same applies to the username being too short and that error
    //   also being reset.
    // TL;DR Weird interactions, so do this check first.
    const us = this.state.username !== "" && this.state.username.length < 3 ? this.inputInvalid : this.inputValid;
    this.usernameValid = us === this.inputValid;
    this.setState({
      usernameStyle: us
    });

    if (this.state.phone !== "") {
      const phs = validatePhone(this.state.phone) ? this.inputValid : this.inputInvalid;
      this.phoneNumberValid = phs === this.inputValid;
      this.setState({
        phoneStyle: phs
      });
    }

    this.checkForEmptyFields();

    if (!this.emptyFields && this.usernameValid && (this.phone === "" || this.phoneNumberValid)) {
      // perform form submission

      const result = encryption.checkAccount(this.props.email, this.state.password);
      if (!result.loginSuccessful) {
        this.passwordCorrect = false;
        this.setState({
          passwordStyle: this.inputInvalid
        });
        console.log("incorrect password");
      }

      /*
      else if (verification code wrong) {
        this.verificationCorrect = false;
        this.setState({
          verifycodeStyle: this.inputInvalid
        });
        console.log("incorrect verification code");
      }
      */

      else {
        this.passwordCorrect = true;
        this.setState({
          passwordStyle: this.inputValid
        });
        console.log("successfully verified account");
      }
    }
  }

  resetErrors() {
    this.usernameValid = true;
    this.phoneNumberValid = true;
    this.emptyFields = false;
    this.setState({
      verifycodeStyle: this.inputValid,
      usernameStyle: this.inputValid,
      passwordStyle: this.inputValid
    });
  }

  checkForEmptyFields() {
    if (this.state.verifycode === "" || this.state.username === "" || this.state.password === "") {
      this.emptyFields = true;

      const vs = this.state.verifycode === "" ? this.inputInvalid : this.inputValid;
      const us = this.state.username === "" || !this.usernameValid ? this.inputInvalid : this.inputValid;
      const ps = this.state.password === "" ? this.inputInvalid : this.inputValid;
      this.setState({
        verifycodeStyle: vs,
        usernameStyle: us,
        passwordStyle: ps
      });
    }
    else {
      this.emptyFields = false;
    }
  }

  render() {


    if (!this.emailValid) {
      return (
        <div className="uk-text-center">
          <h2 className="uk-heading-line uk-text-center"><span>Error</span></h2>
          <p>The verification link that you clicked seems to be invalid.</p>
          <p>Please try the link again, or contact us if you continue having problems.</p>
        </div>
      );
    }

    else {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend uk-text-center">Verify Account</legend>

            <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="verifycode" className={this.state.verifycodeStyle} type="text" placeholder="Verification Code (required)" value={this.state.verifycode} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.verificationCorrect}>Verification code is incorrect</label>
            </div>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="password" className={this.state.passwordStyle} type="password" placeholder="Password (required)" value={this.state.password} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.passwordCorrect}>Password is incorrect</label>
            </div>

            <div className="uk-margin">
              <hr className="uk-divider-icon" />
            </div>

            <legend className="uk-legend uk-text-center">Profile Information</legend>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="username" className={this.state.usernameStyle} type="text" placeholder="Username (required)" value={this.state.username} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.usernameValid}>Username is too short (minimum 3 characters)</label>
            </div>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="firstname" className="uk-input" type="text" placeholder="First Name" value={this.state.firstname} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="lastname" className="uk-input" type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="phone" className={this.state.phoneStyle} type="tel" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.phoneNumberValid}>Not a valid phone number</label>
            </div>

            <div className="uk-margin">
              <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Complete Registration">Complete Registration</button>
            </div>

          </fieldset>
        </form>
      );
    }
  }
}
