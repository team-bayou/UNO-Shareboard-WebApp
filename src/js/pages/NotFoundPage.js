import React, { Component } from 'react';
import AppFooter from '../components/AppFooter';

export default class NotFound extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default center">
            <div className="uk-card-body">
              <div className="uk-text-center">
                <h2 className="uk-heading-line uk-text-center"><span>Page Not Found</span></h2>
                <p>The page you are looking for doesn't seem to exist.</p>
                <p>Please check the link that you clicked, or you can head to the <a href="/">home page</a>.</p>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
