import React, { Component } from 'react';
import AdList from './ListingList';

export default class ListingFeed extends Component {
  render() {
    return (
        <div className="uk-container uk-align-center">
          <AdList listings={this.props.listings}/>
        </div>
    );
  }
}
