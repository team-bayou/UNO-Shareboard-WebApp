import React, { Component } from 'react';
import AddReview from './AddReviewPage';

export default class EditReviewPage extends Component {
  render() {
    return (
      <AddReview id={this.props.params.id} edit={true}/>
    );
  }
}
