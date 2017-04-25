import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');
const validatePhone = utilities.validatePhone;
const validateEmail = utilities.validateEmail;

export default class UserVerificationForm extends Component {
  constructor(props) {
    super(props);

    let pageNeedsLoading = true;
    this.emailValid = true;

    if (!props.email || !validateEmail(props.email)) {
      this.emailValid = false;
      pageNeedsLoading = false;
    }
    else {
      utilities.checkForUnverifiedEmail(props.email, function (exists) {
        this.emailValid = exists;
        this.setState({
          pageLoaded: true
        });
      }.bind(this));
    }

    this.emptyFields = false;
    this.usernameValid = true;
    this.phoneNumberValid = true;
    this.verificationCorrect = true;
    this.usernameExists = false;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.state = {
      verifycode: '',
      username: '',
      firstname: '',
      lastname: '',
      phone: '',

      verifycodeStyle: this.inputValid,
      usernameStyle: this.inputValid,
      firstnameStyle: this.inputValid,
      lastnameStyle: this.inputValid,
      phoneStyle: this.inputValid,

      pageLoaded: !pageNeedsLoading,
      verifyComplete: false,
      verifyFailed: false
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

    else if (name === "phone") {
      const phs = value === "" || validatePhone(value).isValid ? this.inputValid : this.inputInvalid;
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
      const phs = validatePhone(this.state.phone).isValid ? this.inputValid : this.inputInvalid;
      this.phoneNumberValid = phs === this.inputValid;
      this.setState({
        phoneStyle: phs
      });
    }

    this.checkForEmptyFields();

    if (!this.emptyFields && this.usernameValid && (this.phone === "" || this.phoneNumberValid)) {
      // perform form submission

      utilities.checkForExistingUsername(this.state.username, function(usernameExists) {
        if (usernameExists) {
          this.usernameExists = true;
          this.setState({
            usernameStyle: this.inputInvalid
          });
        }
        else {
          this.usernameExists = false;
          this.setState({
            usernameStyle: this.inputValid
          });

          const info = {
            email: this.props.email,
            verificationCode: this.state.verifycode,
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone
          };
          utilities.performVerification(info, function(verifyCodeCorrect, error) {
            if (verifyCodeCorrect) {
              this.verificationCorrect = true;
              this.setState({
                verifycodeStyle: this.inputValid,
                verifyComplete: true
              });
            }
            else if (!error) {
              this.verificationCorrect = false;
              this.setState({
                verifycodeStyle: this.inputInvalid
              });
            }
            else {
              this.setState({
                verifyFailed: true
              });
            }

          }.bind(this));
        }
      }.bind(this));
    }
  }

  resetErrors() {
    this.usernameValid = true;
    this.phoneNumberValid = true;
    this.emptyFields = false;
    this.verificationCorrect = true;
    this.setState({
      verifycodeStyle: this.inputValid,
      usernameStyle: this.inputValid,
      verifyFailed: false
    });
  }

  checkForEmptyFields() {
    if (this.state.verifycode === "" || this.state.username === "") {
      this.emptyFields = true;

      const vs = this.state.verifycode === "" ? this.inputInvalid : this.inputValid;
      const us = this.state.username === "" || !this.usernameValid ? this.inputInvalid : this.inputValid;
      this.setState({
        verifycodeStyle: vs,
        usernameStyle: us
      });
    }
    else {
      this.emptyFields = false;
    }
  }

  render() {

    if (!this.state.pageLoaded) {
      return (
        <div className="uk-text-center">
          <p>Loading...</p>
        </div>
      );
    }

    else {

      if (this.state.verifyComplete) {
        return (
          <div className="uk-text-center">
            <h2 className="uk-heading-line uk-text-center"><span>Verification Complete</span></h2>
            <p>You have successfully verified your account.</p>
            <p>You may now login with your account by clicking <a href="/">here</a>.</p>
          </div>
        );
      }

      else {

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
                {
                  this.emptyFields ?
                  <div className="uk-alert-danger uk-text-center" data-uk-alert>
                    <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
                  </div>
                  : null
                }
                {
                  this.state.verifyFailed ?
                  <div className="uk-alert-danger uk-text-center" data-uk-alert>
                    <p><span data-uk-icon="icon: warning"></span> There was an error when attempting to verify your account<br />Please try again or contact us if the problem persists</p>
                  </div>
                  : null
                }
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="verifycode">Verification Code <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input id="verifycode" name="verifycode" className={this.state.verifycodeStyle} type="text" placeholder="Verification Code" value={this.state.verifycode} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.verificationCorrect}>Verification code is incorrect</label>
                </div>

                <div className="uk-margin">
                  <hr className="uk-divider-icon" />
                </div>

                <legend className="uk-legend uk-text-center">Profile Information</legend>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="username">Username <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input id="username" name="username" className={this.state.usernameStyle} type="text" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.usernameValid}>Username is too short (minimum 3 characters)</label>
                  <label className="uk-form-label label-invalid" hidden={!this.usernameExists}>That username has already been taken</label>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="firstname">First Name</label>
                  <div className="uk-form-controls">
                    <input id="firstname" name="firstname" className="uk-input" type="text" placeholder="First Name" value={this.state.firstname} onChange={this.handleInputChange} />
                  </div>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="lastname">Last Name</label>
                  <div className="uk-form-controls">
                    <input id="lastname" name="lastname" className="uk-input" type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInputChange} />
                  </div>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="phone">Phone Number</label>
                  <div className="uk-form-controls">
                    <input id="phone" name="phone" className={this.state.phoneStyle} type="tel" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} />
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
  }
}
