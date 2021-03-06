import React, { Component } from 'react';
import UserVerificationForm from '../components/UserVerificationForm';
import AppFooter from '../components/AppFooter';
import '../../css/styles.css';

export default class UserVerificationPage extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1 className="uk-heading uk-text-center"><a href="/" className="header-link">UNO Shareboard</a></h1>
        </div>
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default center">
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
