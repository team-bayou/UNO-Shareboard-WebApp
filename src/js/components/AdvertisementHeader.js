import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';
import utils from '../utility/utilities';

export default class AdvertisementHeader extends Component {
  render(){
    return (
      <div className="uk-card-header">
        <a href={"/advertisements/" + this.props.ad.id} className="uk-link-reset">
          <h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
        </a>
        <p className="ad-time-published uk-text-meta uk-margin-remove-top">{utils.getDateTime(this.props.ad)}</p>
        <AdCategory category={this.props.ad.category}/>
      </div>
    );
  }
}
