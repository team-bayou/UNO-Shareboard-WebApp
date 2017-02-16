import React, { Component } from 'react';
import AdCategoryList from './AdvertisementCategoryList';

import logo from '../../media/images/light.jpg';
import avatar from '../../media/images/avatar.jpg';

export default class AdvertisementListElement extends Component {
  render(){
    var routeToUser = "/users/" + this.props.ad.owner.account_name;

    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top">
            <img src={logo} alt=""/>
          </div>
          <div className="uk-card-header">
            <h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
            <p className="ad-time-published uk-text-meta uk-margin-remove-top">{this.props.ad.time_published}</p>
            <AdCategoryList categories={this.props.ad.categories}/>
          </div>
          <div className="ad-description uk-card-body">
          <div className="ad-item uk-card-badge uk-label">{this.getItem()}</div>
            <p>{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <a href={"/advertisements/" + this.props.ad.id} className="ad-details uk-button uk-button-text">Read more</a>
            <div className="ad-owner uk-float-right uk-width-auto">
              <a href={routeToUser} title={this.props.ad.owner.account_name} data-uk-tooltip="pos: bottom">
                <img className="uk-border-circle" width="40" height="40" src={avatar} alt=""/>
              </a>
            </div>
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
