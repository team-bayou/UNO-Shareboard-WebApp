import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import '../css/styles.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="app landing-container">
        <div className="app-body uk-container">
          <div className="uk-card uk-card-default uk-width-large uk-align-center landing-form">
            <div className="uk-card-body">
              <ul className="uk-child-width-expand" data-uk-tab data-uk-switcher="{connect:'#formcontainer'}">
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
