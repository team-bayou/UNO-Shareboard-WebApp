import React, { Component } from 'react';
import AddListing from './AddListingPage';

export default class EditListingPage extends Component {
  render() {
    return (
      <AddListing id={this.props.params.id} edit={true}/>
    );
  }
}
