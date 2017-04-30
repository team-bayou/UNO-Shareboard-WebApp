import React, { Component } from 'react';

export default class ListingBody extends Component {
  render() {
    return (
      <div className="listing-body uk-card-body">
        {this.props.content}
      </div>
    );
  }
}
