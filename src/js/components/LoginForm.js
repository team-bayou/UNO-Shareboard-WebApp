import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');

function validateEmail(event) {
  // eslint-disable-next-line
  const re = /^[A-z0-9_%+-]+.*[A-z0-9_%+-]+@(my.)?uno.edu$/;
  return re.test(event);
}


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

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

    if (name === "email") {
      const es = validateEmail(value) ? this.inputValid : this.inputInvalid;
      this.setState({
        emailStyle: es
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const areSame = encryption.checkAccount(this.state.email, this.state.password);
    console.log(areSame);
  }

  render() {
    return (
      <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Login</legend>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="email" className={this.state.emailStyle} type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.state.emailStyle === this.inputValid}>E-mail must be a UNO e-mail address</label>
          </div>
          <div className="uk-margin">
            <div className="uk-form-controls">
              <input name="password" className={this.state.passwordStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.state.passwordStyle === this.inputValid}>Password is invalid</label>
          </div>
          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center login-btn" type="submit" value="Login">Login</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
