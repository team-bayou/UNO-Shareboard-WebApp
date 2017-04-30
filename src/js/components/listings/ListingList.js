import React, { Component } from 'react';
import Ad from './ListingListElement';

export default class ListingList extends Component {
  render() {
    var ads = this.props.listings.map(
      ad => <Ad key={ad.id} ad={ad} edit={this.props.edit}/>
    );

    return (
      <div className="listing-list">
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" data-uk-grid>
          {ads}
        </div>
      </div>
    );
  }
}
