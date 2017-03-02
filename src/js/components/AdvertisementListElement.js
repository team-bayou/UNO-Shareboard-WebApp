import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';
import utils from '../utility/utilities';

import logo from '../../media/images/light.jpg';
import avatar from '../../media/images/avatar.jpg';

export default class AdvertisementListElement extends Component {
  render(){
    var routeToUser = "/users/" + this.props.ad.owner.accountName;

    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top">
            <img src={logo} alt=""/>
          </div>
          <div className="uk-card-header">
            <a href={"/advertisements/" + this.props.ad.id} className="uk-link-reset"><h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3></a>
            <p className="ad-time-published uk-text-meta uk-margin-remove-top">{utils.getDateTime(this.props.ad)}</p>
            <AdCategory category={this.props.ad.category}/>
          </div>
          <div className="ad-description uk-card-body">
          <div className="ad-item uk-card-badge uk-label">{utils.getItem(this.props.ad)}</div>
            <p>{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <a href={"/advertisements/" + this.props.ad.id} className="ad-details uk-button uk-button-text">Read more</a>
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
