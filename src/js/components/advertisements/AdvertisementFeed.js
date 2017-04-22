import React, { Component } from 'react';
import AdList from './AdvertisementList';

export default class AdvertisementFeed extends Component {
  render() {
    return (
        <div className="uk-container uk-align-center">
            <AdList advertisements={this.props.advertisements}/>
        </div>
    );
  }
}
