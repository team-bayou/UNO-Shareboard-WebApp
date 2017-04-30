import React, { Component } from 'react';

export default class ListingMedia extends Component {

  constructor(props) {
    super(props);

    this.style = this.props.adPage ? "uk-card-media-top uk-text-center" : "listing-media uk-card-media-top uk-text-center";
  }

  render() {
    return (
      <div className={this.style}>
        {this.props.content}
      </div>
    );
  }
}
