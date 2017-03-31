import React, { Component } from 'react';

export default class AdvertisementFooter extends Component {
  render(){
    return (
      <div className="ad-footer uk-card-footer">
        {this.props.content}
      </div>
    );
  }
}
