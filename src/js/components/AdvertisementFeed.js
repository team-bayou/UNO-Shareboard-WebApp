import React, { Component } from 'react';
import AdList from '../components/AdvertisementList';

export default class AdvertisementFeed extends Component {
  render() {
    return (
        <div className="uk-container-small uk-align-center">
            <AdList advertisements={this.props.advertisements}/>
        </div>
    );
  }
}
