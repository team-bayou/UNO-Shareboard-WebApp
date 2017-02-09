import React, { Component } from 'react';
import '../../css/styles.css';

export default class RegisterForm extends Component {
  render() {
    return (
      <form>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend">Register</legend>
          <div className="uk-margin">
            <input className="uk-input" type="text" placeholder="E-mail" />
          </div>
          <div className="uk-margin">
            <input className="uk-input" type="password" placeholder="Password" />
          </div>
          <div className="uk-margin">
            <input className="uk-input" type="password" placeholder="Password (again)" />
          </div>
          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center login-btn" type="button">Register</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

/*
// Below is the old registration form. If we decide we don't like the tabs, we can go back to this (in conjunction with changing the landing page)

import React, { Component } from 'react';
import '../../css/styles.css';

export default class RegisterForm extends Component {
  render() {
    return (
      <div>
        <a href="#register-form" className="uk-button uk-button-text uk-align-right register-btn" data-uk-toggle>Register</a>
        <div id="register-form" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            <p>
              <form>
                <fieldset className="uk-fieldset">
                  <legend className="uk-legend">Register</legend>
                  <div className="uk-margin">
                    <input className="uk-input" type="text" placeholder="E-mail" />
                  </div>
                  <div className="uk-margin">
                    <input className="uk-input" type="password" placeholder="Password" />
                  </div>
                  <div className="uk-margin">
                    <input className="uk-input" type="password" placeholder="Password (again)" />
                  </div>
                </fieldset>
              </form>
            </p>
            <p className="uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
              <button className="uk-button uk-button-secondary" type="button">Register</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
*/
