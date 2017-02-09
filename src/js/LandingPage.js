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
              <ul className="uk-tab" data-uk-switcher="{connect:'#formcontainer'}">
                <li><a href="#">Login</a></li>
                <li><a href="#">Register</a></li>
              </ul>
              <ul id="formcontainer" className="uk-switcher uk-margin">
                <li><LoginForm /></li>
                <li><RegisterForm /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
// Below is the old landing page. If we decide we don't like the tabs, we can go back to this (in conjunction with changing the register form)

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
            <div className="uk-card-header">
              Hello!
            </div>
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
*/
