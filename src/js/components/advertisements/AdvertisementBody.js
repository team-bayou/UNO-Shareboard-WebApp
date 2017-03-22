import React, { Component } from 'react';

export default class AdvertisementBody extends Component {
  render(){
    return (
      <div className="ad-body uk-card-body">
        {this.props.content}
      </div>
    );
  }
}
