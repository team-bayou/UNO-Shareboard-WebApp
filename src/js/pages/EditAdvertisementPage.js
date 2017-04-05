import React, { Component } from 'react';
import AddAdvertisement from './AddAdvertisementPage';

export default class EditAdvertisementPage extends Component {
  render() {
    return (
      <AddAdvertisement id={this.props.params.id} edit={true}/>
    );
  }
}
