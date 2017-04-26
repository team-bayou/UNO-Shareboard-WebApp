import React, { Component } from 'react';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

export default class SubmitCancelButtons extends Component {
  render() {
    return(
      <div className="uk-flex uk-flex-center uk-margin-medium-top">
        <div className="uk-width-1-5 uk-margin-small-right">
          <SubmitButton />
        </div>
        <div className="uk-width-1-5">
          <CancelButton />
        </div>
      </div>
    );
  }
}
