import React, { Component } from 'react';
import AdListPage from './ListingListPage';

export default class SeekListingsListPage extends Component {
  render() {
    return (<AdListPage adType={"seek"} page={this.props.params.page} />);
  }
}
