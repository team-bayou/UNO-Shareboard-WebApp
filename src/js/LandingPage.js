import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import '../css/styles.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="app landing-form">
        <div className="app-body uk-container">
          <div className="uk-card uk-card-default uk-width-large uk-align-center form-login">
            <div className="uk-card-body">
              <LoginForm />
            </div>
            <div className="uk-card-footer">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
