import React, { Component } from 'react';
import ReportProblemForm from './ReportProblemForm';

export default class AppFooter extends Component {
  render() {
    return (
      <div className="app-footer uk-margin-small-top uk-margin-small-bottom">
        <hr />
        <p><a href="#report-problem" data-uk-toggle>Report A Problem</a></p>

        <div id="report-problem" data-uk-modal="center: true">
          <div className="uk-modal-dialog uk-modal-body">
            <h2 className="uk-modal-title uk-text-center">Report Problem</h2>
            <ReportProblemForm />
          </div>
        </div>
      </div>
    );
  }
}
