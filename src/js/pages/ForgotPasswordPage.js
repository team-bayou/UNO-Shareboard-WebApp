import React, { Component } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import AppFooter from '../components/AppFooter';
import '../../css/styles.css';

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1 className="uk-heading uk-text-center"><a href="/" className="header-link">UNO Shareboard</a></h1>
        </div>
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default center">
            <div className="uk-card-body">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
