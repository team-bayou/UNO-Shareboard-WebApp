import React, { Component } from 'react';
import Ad from './AdvertisementListElement';

export default class AdvertisementList extends Component {
  render(){
    var ads = this.props.advertisements.map(
      ad => <Ad key={ad.id} ad={ad}/>
    );

    return (
      <div className="ad-list">
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" data-uk-grid>
          {ads}
        </div>
      </div>
    );
  }
}
