import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');


function validateEmail(event) {
  // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  // eslint-disable-next-line
  const re = /^[A-z0-9_%+-]+.*[A-z0-9_%+-]+@(my.)*uno.edu$/;
  return re.test(event);
}


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    const areSame = encryption.checkAccount(this.state.email, this.state.password);
    //console.log(areSame);

    console.log(validateEmail(this.state.email));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Login</legend>
          <div className="uk-margin">
            <input name="email" className="uk-input" type="text" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
          </div>
          <div className="uk-margin">
            <input name="password" className="uk-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center login-btn" type="submit" value="Login">Login</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
