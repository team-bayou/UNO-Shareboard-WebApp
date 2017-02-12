import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emailExists = true;
    this.passwordCorrect = true;
    this.emptyFields = false;
    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

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

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // We have to make sure we reset the states
    //   because otherwise they'll stay in their
    //   error state even after being fixed.
    this.resetErrors();

    const result = encryption.checkAccount(this.state.email, this.state.password);

    if (this.state.email === "" || this.state.password === "") {
      this.emptyFields = true;

      const es = this.state.email === "" ? this.inputInvalid : this.inputValid;
      const ps = this.state.password === "" ? this.inputInvalid : this.inputValid;
      this.setState({
        emailStyle: es,
        passwordStyle: ps
      });
    }

    else if (!result.emailExists) {
        this.emailExists = false;
        this.setState({
          emailStyle: this.inputInvalid
        });
    }

    else if (!result.loginSuccessful) {
      this.passwordCorrect = false;
      this.setState({
        passwordStyle: this.inputInvalid
      });
    }

    else {
      alert('Logged in successfully');
    }
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

  render() {
    return (
      <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Login</legend>
          <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all fields are filled out</label>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="email" className={this.state.emailStyle} type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.emailExists}>No account exists with that e-mail address</label>
          </div>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="password" className={this.state.passwordStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordCorrect}>Password is incorrect</label>
          </div>
          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center login-btn" type="submit" value="Login">Login</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
