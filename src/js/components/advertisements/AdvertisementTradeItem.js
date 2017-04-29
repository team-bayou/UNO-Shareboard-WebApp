import utils from '../../utility/utilities';

import React, { Component } from 'react';

export default class AdvertisementTradeItem extends Component {
  constructor(props) {
    super(props);

    this.style = this.props.adPage ? "listing-item uk-card-header" : "listing-item-ele listing-item uk-card-header";
  }

  render() {
    return (
      <div className={this.style}>
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
          <p className="listing-item-trade-item uk-margin-remove">Will Trade For: <span className="uk-text-break">{this.props.ad.tradeItem}</span></p>
        }
      </div>
    );
  }
}
