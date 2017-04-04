import React, { Component } from 'react';
import ReportProblemForm from '../components/ReportProblemForm';
import AppFooter from '../components/AppFooter';

export default class ReportProblemPage extends Component {
  render() {
    return (
      <div id="landing" className="app">
        <div className="app-body uk-container">
          <div className="landing-form uk-card uk-card-default uk-width-large uk-align-center">
            <div className="uk-card-body">
              <div>
                <h2 className="uk-heading-line uk-text-center"><span>Report Problem</span></h2>
                <ReportProblemForm />
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}
