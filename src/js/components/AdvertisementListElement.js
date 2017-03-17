import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';
import AdTradeItem from './AdvertisementTradeItem';
import AdHeader from './AdvertisementHeader';
import utils from '../utility/utilities';

import logo from '../../media/images/light.jpg';
import avatar from '../../media/images/avatar.jpg';

export default class AdvertisementListElement extends Component {
  render(){
    var routeToUser = "/users/" + this.props.ad.owner.id;

    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top">
            <a href={"/advertisements/" + this.props.ad.id}>
            <img src={logo} alt=""/>
            </a>
          </div>
          <AdTradeItem ad={this.props.ad} />
          <AdHeader ad={this.props.ad} />
          <div className="ad-description uk-card-body">
            <p className="uk-text-truncate">{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <a href={"/advertisements/" + this.props.ad.id} className="ad-details uk-button uk-button-text">Details</a>
            <div className="ad-owner uk-float-right uk-width-auto">
              <a href={routeToUser} title={this.props.ad.owner.accountName} data-uk-tooltip="pos: bottom">
                <img className="uk-border-circle" width="40" height="40" src={avatar} alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
