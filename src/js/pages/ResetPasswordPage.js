import React, { Component } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import '../../css/styles.css';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <div id="landing" className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default uk-width-large uk-align-center">
            <div className="uk-card-body">
              <ResetPasswordForm email={this.props.location.query.email} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
