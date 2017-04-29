import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AppFooter from '../components/AppFooter';
import '../../css/styles.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1 className="uk-heading uk-text-center"><a href="/" className="header-link">UNO Shareboard</a></h1>
        </div>
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default center">
            <div className="uk-card-body">
              <ul className="uk-child-width-expand" data-uk-tab data-uk-switcher="{connect:'#form-container'}">
                <li><a href="#">Login</a></li>
                <li><a href="#">Register</a></li>
              </ul>
              <ul id="form-container" className="uk-switcher uk-margin">
                <li><LoginForm /></li>
                <li><RegisterForm /></li>
              </ul>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
