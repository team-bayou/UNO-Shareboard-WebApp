import React, { Component } from 'react';
import '../../css/styles.css';

export default class RegisterForm extends Component {
  render() {
    return (
      <div>
        <a href="#register-form" className="uk-button uk-button-text" data-uk-toggle>Register</a>

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
                </fieldset>
              </form>
            </p>
            <p className="uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
              <button className="uk-button uk-button-primary" type="button">Register</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
