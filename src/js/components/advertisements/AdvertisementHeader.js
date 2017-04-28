import React, { Component } from 'react';
import Category from '../Category';
import utils from '../../utility/utilities';

export default class AdvertisementHeader extends Component {
  render() {
    return (
      <div className="listing-header uk-card-header">
        <a href={"/advertisements/" + this.props.ad.id} className="uk-link-reset">
          <h3 className="listing-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
        </a>
        <p className="listing-time-published uk-text-meta uk-margin-remove-top">{utils.getDateTime(this.props.ad)}</p>
        <Category category={this.props.ad.category}/>
      </div>
    );
  }
}
