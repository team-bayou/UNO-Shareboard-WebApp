import React, { Component } from 'react';
import AdListPage from './AdvertisementListPage';

export default class SeekAdvertisementsListPage extends Component {
  render() {
    return (<AdListPage adType={"seek"} page={this.props.params.page} />);
  }
}
