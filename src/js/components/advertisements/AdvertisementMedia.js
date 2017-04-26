import React, { Component } from 'react';

export default class AdvertisementMedia extends Component {
  render() {
    return (
      <div className="listing-media uk-card-media-top uk-text-center">
        {this.props.content}
      </div>
    );
  }
}
