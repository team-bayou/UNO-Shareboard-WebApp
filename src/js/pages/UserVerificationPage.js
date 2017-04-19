import React, { Component } from 'react';
import UserVerificationForm from '../components/UserVerificationForm';
import AppFooter from '../components/AppFooter';
import '../../css/styles.css';

export default class UserVerificationPage extends Component {
  render() {
    return (
      <div id="landing" className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default uk-width-large uk-align-center">
            <div className="uk-card-body">
              <UserVerificationForm email={this.props.location.query.email} />
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
