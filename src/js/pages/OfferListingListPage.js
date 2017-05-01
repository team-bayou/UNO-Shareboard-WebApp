import React, { Component } from 'react';
import AdListPage from './ListingListPage';

export default class OfferListingsListPage extends Component {
  render() {
    return (<AdListPage adType={"offer"} page={this.props.params.page} />);
  }
}
