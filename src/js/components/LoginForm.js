import React, { Component } from 'react';
import '../../css/styles.css';

export default class LoginForm extends Component {
  render() {
    return (
      <form>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Login</legend>
          <div className="uk-margin">
            <input className="uk-input" type="text" placeholder="E-mail" />
          </div>
          <div className="uk-margin">
            <input className="uk-input" type="password" placeholder="Password" />
          </div>
        </fieldset>
      </form>
    );
  }
}
