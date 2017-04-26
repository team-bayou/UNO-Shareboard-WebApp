import utils from '../../utility/utilities';

import React, { Component } from 'react';

export default class AdvertisementTradeItem extends Component {
  render() {
    return (
      <div className="listing-item uk-card-header">
        {
          utils.getPrice(this.props.ad) === 'Free' && !this.props.ad.tradeItem ?
          <p className="listing-item-price uk-margin-remove"><span className="uk-text-break">Free</span></p>
          : null
        }
        {
          utils.getPrice(this.props.ad) !== 'Free' ?
          <p className="listing-item-price uk-margin-remove"><span className="uk-text-break">{utils.getPrice(this.props.ad)}</span></p>
          : null
        }
        {
          this.props.ad.tradeItem &&
          <p className="listing-item-trade-item uk-margin-small-top uk-margin-remove-bottom">Will Trade For: <span className="uk-text-break">{this.props.ad.tradeItem}</span></p>
        }
      </div>
    );
  }
}
