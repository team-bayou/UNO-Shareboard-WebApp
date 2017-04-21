import React, { Component } from 'react';
import AdListPage from './AdvertisementListPage';

export default class OfferAdvertisementsListPage extends Component {
  render() {
    return (<AdListPage adType={"offer"} page={this.props.params.page} />);
  }
}
