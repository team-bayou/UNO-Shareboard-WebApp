import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');
const validateEmail = utilities.validateEmail;

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    let pageNeedsLoading = true;
    this.propsValid = true;

    if (!props.email || !props.code || !validateEmail(props.email)) {
      this.propsValid = false;
      pageNeedsLoading = false;
    }
    else {
      utilities.checkForUnverifiedEmail(props.email, function (exists) {
        this.propsValid = exists;
        this.setState({
          pageLoaded: true
        });
      }.bind(this));
    }

    this.emptyFields = false;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.state = {
      password: '',
      passwordConfirm: '',

      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid,

      pageLoaded: !pageNeedsLoading,
      resetComplete: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

      if (this.state.resetComplete) {
        return (
          <div className="uk-text-center">
            <h2 className="uk-heading-line uk-text-center"><span>Password Updated</span></h2>
            <p>Your password has been updated.</p>
            <p>You may now <a href="/">login</a> with your new password.</p>
          </div>
        );
      }

      else {

        if (!this.propsValid) {
          return (
            <div className="uk-text-center">
              <h2 className="uk-heading-line uk-text-center"><span>Error</span></h2>
              <p>The link that you clicked seems to be invalid.</p>
              <p>Please try the link again, or contact us if you continue having problems.</p>
            </div>
          );
        }

        else {
          return (
            <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend uk-text-center">Reset Password</legend>

                <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all fields are filled out</label>

                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <input name="verifycode" className={this.state.verifycodeStyle} type="text" placeholder="Verification Code (required)" value={this.state.verifycode} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.verificationCorrect}>Verification code is incorrect</label>
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