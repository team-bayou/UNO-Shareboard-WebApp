import utils from '../utility/utilities';

import React, { Component } from 'react';

export default class AdvertisementTradeItem extends Component {
  render(){
    return (
      <div className="ad-item uk-card-header">
        <p className="ad-item-price uk-margin-remove">Price: <span className="uk-text-bold">{utils.getPrice(this.props.ad)}</span></p>
        {
          this.props.ad.tradeItem &&
          <p className="ad-item-trade-item uk-margin-small-top uk-margin-remove-bottom">Trade item: <span className="uk-text-bold">{this.props.ad.tradeItem}</span></p>
        }
      </div>
    );
  }
}
