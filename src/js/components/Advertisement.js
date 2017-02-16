import React, { Component } from 'react';
import AdCategoryList from './AdvertisementCategoryList';
import AdOwnerDetails from './AdvertisementOwnerDetails';

import logo from '../../media/images/light.jpg';

export default class Advertisement extends Component {
  render(){
    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top">
            <div className="uk-inline uk-visible-toggle">
              <img src={logo} alt=""/>
              <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large" href="#" data-uk-slidenav-previous></a>
              <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large" href="#" data-uk-slidenav-next></a>
            </div>
          </div>
          <div className="uk-card-header">
            <div className="uk-column-1-2">
              <h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
              <p className="ad-item uk-margin-remove">Price/Trade item: <span className="uk-label">{this.getItem()}</span></p>
            </div>
              <p className="ad-time-published uk-text-meta uk-margin-remove-top">{this.props.ad.time_published}</p>
              <AdCategoryList categories={this.props.ad.categories}/>
          </div>
          <div className="ad-description uk-card-body">
            <p>{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <AdOwnerDetails owner={this.props.ad.owner} />
          </div>
        </div>
      </div>
    );
  }

  getItem(){
    if (this.props.ad.price == null)
      if (this.props.ad.trade_item == null)
        return 'Free';
      else
        return this.props.ad.trade_item;
    return this.props.ad.price;
  }
}
