import React, { Component } from 'react';

export default class ListingFooter extends Component {
  render() {
    return (
      <div className="listing-footer uk-card-footer">
        {this.props.content}
      </div>
    );
  }
}
