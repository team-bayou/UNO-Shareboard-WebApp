import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');
const validateEmail = utilities.validateEmail;

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    let pageNeedsLoading = false;
    this.propsValid = true;

    if (!props.email || !props.code || !validateEmail(props.email)) {
      this.propsValid = false;
      pageNeedsLoading = false;
    }
    else {
      /*utilities.checkForUnverifiedEmail(props.email, function (exists) {
        this.propsValid = exists;
        this.setState({
          pageLoaded: true
        });
      }.bind(this));
      */
    }

    this.emptyFields = false;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.passwordValid = true;
    this.passwordMatch = true;

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
      if (this.state.password.length < 6) {
        this.passwordValid = false;
        this.setState({
          passwordStyle: this.inputInvalid
        });
      }
      else if (this.state.password !== this.state.passwordConfirm) {
        this.passwordMatch = false;
        this.setState({
          passwordConfirmStyle: this.inputInvalid
        });
      }
      else {
        console.log("password updated");
      }
    }
  }

  resetErrors() {
    this.passwordValid = true;
    this.passwordMatch = true;
    this.emptyFields = false;
    this.setState({
      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid
    });
  }

  checkForExistingErrors() {
    const ps = this.state.password !== "" && this.state.password.length < 6 ? this.inputInvalid : this.inputValid;
    const pcs = this.state.passwordConfirm !== "" && this.state.password !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
    this.setState({
      passwordStyle: ps,
      passwordConfirmStyle: pcs
    });

    this.passwordValid = ps === this.inputValid;
    this.passwordMatch = pcs === this.inputValid;
  }

  checkForEmptyFields() {
    if (this.state.password === "" || this.state.passwordConfirm === "") {
      this.emptyFields = true;

      const ps = this.state.password === "" || this.state.password.length < 6 ? this.inputInvalid : this.inputValid;
      const pcs = this.state.passwordConfirm === "" || this.state.password !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
      this.setState({
        passwordStyle: ps,
        passwordConfirmStyle: pcs
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

                <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure both fields are filled out</label>

                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <input name="password" className={this.state.passwordStyle} type="password" placeholder="New Password" value={this.state.password} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.passwordValid}>Password is too short (minimum 6 characters)</label>
                </div>

                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <input name="passwordConfirm" className={this.state.passwordConfirmStyle} type="password" placeholder="New Password (Confirm)" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.passwordMatch}>Passwords don't match</label>
                </div>

                <div className="uk-margin">
                  <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Complete Registration">Set Password</button>
                </div>

              </fieldset>
            </form>
          );
        }
      }
    }
  }

}
