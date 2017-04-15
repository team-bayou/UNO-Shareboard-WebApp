import React, { Component } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import '../../css/styles.css';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <div id="landing" className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default uk-width-large uk-align-center">
            <div className="uk-card-body">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
