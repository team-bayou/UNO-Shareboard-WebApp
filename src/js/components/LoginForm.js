import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../../css/styles.css';

const utilities = require('../utility/utilities');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emailExists = true;
    this.passwordCorrect = true;
    this.emptyFields = false;
    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";
    this.unverifiedUser = false;

    this.state = {
      email: '',
      password: '',
      emailStyle: this.inputValid,
      passwordStyle: this.inputValid
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const style = value === "" && this.emptyFields ? this.inputInvalid : this.inputValid;
    this.setState({
      [name]: value,
      [name + "Style"]: style
    });

    // We can't simply check against "this.state" for both values because
    //   "this.state" will not be updated for the currently being changed
    //   field until after this method call has finished, so we'd be one
    //   character behind, throwing the whole logic off.
    if ((name === "email" && value !== "" && this.state.password !== "") ||
        (name === "password" && value !== "" && this.state.email !== ""))
      this.emptyFields = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    // We have to make sure we reset the states
    //   because otherwise they'll stay in their
    //   error state even after being fixed.
    this.resetErrors();

    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.loginbtn.setAttribute("disabled", "disabled");

      utilities.checkAccount(this.state.email, this.state.password, function(emailExists, loginSuccessful, unverifiedUser) {
        if (!emailExists) {
            this.emailExists = false;
            this.setState({
              emailStyle: this.inputInvalid
            });
            this.refs.loginbtn.removeAttribute("disabled");
        }

        else if (!loginSuccessful) {
          this.passwordCorrect = false;
          this.setState({
            passwordStyle: this.inputInvalid
          });
          this.refs.loginbtn.removeAttribute("disabled");
        }

        if (emailExists && loginSuccessful) {
          if (unverifiedUser) {
            this.unverifiedUser = true;
            this.setState({
              emailStyle: this.inputValid,
              passwordStyle: this.inputValid
            });
            this.refs.loginbtn.removeAttribute("disabled");
          }
          else {
            // perform login
            utilities.bakeCookies(this.state.email, function() {
              browserHistory.push("/home");
            });
          }
        }
      }.bind(this));
    }
  }

  resetErrors() {
    this.emailExists = true;
    this.passwordCorrect = true;
    this.emptyFields = false;
    this.unverifiedUser = false;
    this.setState({
      emailStyle: this.inputValid,
      passwordStyle: this.inputValid
    });
  }

  checkForEmptyFields() {
    if (this.state.email === "" || this.state.password === "") {
      this.emptyFields = true;

      const es = this.state.email === "" ? this.inputInvalid : this.inputValid;
      const ps = this.state.password === "" ? this.inputInvalid : this.inputValid;
      this.setState({
        emailStyle: es,
        passwordStyle: ps
      });
    }
  }

  render() {
    return (
      <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend landing-header">Login</legend>
          {
            this.emptyFields ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
            </div>
            : null
          }
          {
            this.unverifiedUser ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> Your account exists but has not been verified<br />Please check the e-mail that you registered with for your verification instructions</p>
            </div>
            : null
          }
          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="email">E-mail / Username <span className="label-invalid">*</span></label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-1-1">
                <span className="uk-form-icon" data-uk-icon="icon: user"></span>
                <input id="email" name="email" className={this.state.emailStyle} type="text" placeholder="E-mail / Username" value={this.state.email} onChange={this.handleInputChange} />
              </div>
            </div>
            <label className="uk-form-label label-invalid" hidden={this.emailExists}>No account exists with that e-mail / username</label>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="password">Password <span className="label-invalid">*</span></label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-1-1">
                <span className="uk-form-icon" data-uk-icon="icon: lock"></span>
                <input id="password" name="password" className={this.state.passwordStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
              </div>
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordCorrect}>Password is incorrect</label>
          </div>
          <div className="uk-margin">
            <button ref="loginbtn" className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Login">Login</button>
          </div>
          <div className="uk-margin-top uk-text-center">
            <a href="/forgotpassword">Forgot Password?</a>
          </div>
        </fieldset>
      </form>
    );
  }
}
