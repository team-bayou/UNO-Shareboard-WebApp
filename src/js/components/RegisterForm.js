import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');
const validateEmail = utilities.validateEmail;

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";
    this.emptyFields = false;
    this.emailValid = true;
    this.emailExists = false;
    this.passwordValid = true;
    this.passwordMatch = true;

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      emailStyle: this.inputValid,
      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid,
      registrationSubmitted: false,
      registrationFailed: false
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

    // We reset the error messages of each field
    //   so that there isn't any kind of weird interactions
    //   between empty field errors and invalid value errors.
    this.resetErrors();

    // If errors existed before this current tick and the
    //   previous call to resetErrors() cleared them,
    //   we need to put them back since they're still
    //   errors.
    this.checkForExistingErrors();

    // For the following, we have to check the value directly because the state doesn't
    //   get updated until render() is called again, which doesn't happen until
    //   after this method finishes being called. So by checking state instead
    //   of checking the value directly, we'd be one character behind.
    if (name === "email") {
      const style = validateEmail(value) ? this.inputValid : this.inputInvalid;
      this.emailValid = style === this.inputValid;
      this.setState({
        emailStyle: style
      });
    }

    else if (name === "password") {
      const style = value.length < 6 ? this.inputInvalid : this.inputValid;
      this.passwordValid = style === this.inputValid;
      this.setState({
        passwordStyle: style
      });

      const confirmStyle = this.state.passwordConfirm !== "" && value !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
      this.passwordMatch = confirmStyle === this.inputValid;
      this.setState({
        passwordConfirmStyle: confirmStyle
      });
    }

    else if (name === "passwordConfirm") {
      const style = value === this.state.password ? this.inputValid : this.inputInvalid;
      this.passwordMatch = style === this.inputValid;
      this.setState({
        passwordConfirmStyle: style
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.checkForEmptyFields();

    if (!this.emptyFields && this.emailValid && this.passwordValid && this.passwordMatch) {
      utilities.checkForExistingEmail(this.state.email, function(emailExists) {
        if (emailExists) {
          this.emailExists = true;
          this.setState({
            emailStyle: this.inputInvalid
          });
        }
        else {
          this.emailExists = false;
          this.setState({
            emailStyle: this.inputValid
          });

          utilities.performRegistration(this.state.email, this.state.password, function(success) {
            if (success) {
              this.setState({
                registrationSubmitted: true,
                registrationFailed: false
              });
            }
            else {
              this.setState({
                registrationFailed: true,
                registrationSubmitted: false
              });
            }
          }.bind(this));
        }
      }.bind(this));
    }
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetErrors() {
    this.emailValid = true;
    this.passwordValid = true;
    this.passwordMatch = true;
    this.emptyFields = false;
    this.emailExists = false;
    this.setState({
      emailStyle: this.inputValid,
      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid
    });
  }

  // Check our fields to see if any of them are invalid.
  // Important to note that we only want to check a field if it isn't empty
  //   because no one wants to be yelled at for doing something wrong
  //   before they've even started trying.
  checkForExistingErrors() {
    const es = this.state.email !== "" && !validateEmail(this.state.email) ? this.inputInvalid : this.inputValid;
    const ps = this.state.password !== "" && this.state.password.length < 6 ? this.inputInvalid : this.inputValid;
    const pcs = this.state.passwordConfirm !== "" && this.state.password !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
    this.setState({
      emailStyle: es,
      passwordStyle: ps,
      passwordConfirmStyle: pcs
    });

    this.emailValid = es === this.inputValid;
    this.passwordValid = ps === this.inputValid;
    this.passwordMatch = pcs === this.inputValid;
  }

  // Check our fields to see if any of them are empty.
  // This is used when submitting the form to make sure all fields
  //   are filled out before allowing the submission.
  checkForEmptyFields() {
    if (this.state.email === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      this.emptyFields = true;

      const es = this.state.email === "" || !validateEmail(this.state.email) ? this.inputInvalid : this.inputValid;
      const ps = this.state.password === "" || this.state.password.length < 6 ? this.inputInvalid : this.inputValid;
      const pcs = this.state.passwordConfirm === "" || this.state.password !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
      this.setState({
        emailStyle: es,
        passwordStyle: ps,
        passwordConfirmStyle: pcs
      });
    }
    else {
      this.emptyFields = false;
    }
  }

  render() {

    if (this.state.registrationSubmitted) {
      return (
        <div className="uk-text-center">
          <p>Registration completed successfully.</p>
          <p>Please check your e-mail for instructions on verifying your account.</p>
        </div>
      );
    }

    else {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend landing-header">Register</legend>
            <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all fields are filled out</label>
            <label className="uk-form-label label-invalid" hidden={!this.state.registrationFailed}>There was an error when submitting your registration<br />Please wait and try again, or contact us if the problem persists</label>
            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="email" className={this.state.emailStyle} type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.emailValid}>E-mail must be a UNO e-mail address</label>
              <label className="uk-form-label label-invalid" hidden={!this.emailExists}>An account with that e-mail already exists</label>
            </div>
            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="password" className={this.state.passwordStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.passwordValid}>Password is too short (minimum 6 characters)</label>
            </div>
            <div className="uk-margin">
              <div className="uk-form-controls">
                <input name="passwordConfirm" className={this.state.passwordConfirmStyle} type="password" placeholder="Password (again)" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.passwordMatch}>Passwords don't match</label>
            </div>
            <div className="uk-margin">
              <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Register">Register</button>
            </div>
          </fieldset>
        </form>
      );
    }
  }
}
