import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AppFooter from '../components/AppFooter';
import '../../css/styles.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div id="landing" className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default uk-width-large uk-align-center">
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
