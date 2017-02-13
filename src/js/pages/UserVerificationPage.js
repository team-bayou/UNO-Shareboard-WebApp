import React, { Component } from 'react';
import UserVerificationForm from '../components/UserVerificationForm';
import '../../css/styles.css';

export default class UserVerificationPage extends Component {
  render() {
    return (
      <div className="app landing-container">
        <div className="app-body uk-container">
          <div className="uk-card uk-card-default uk-width-large uk-align-center landing-form">
            <div className="uk-card-body">
              <UserVerificationForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
