import React, { Component } from 'react';

export default class AdvertisementMedia extends Component {
  render(){
    return (
      <div className="ad-media uk-card-media-top uk-text-center">
        {this.props.content}
      </div>
    );
  }
}
