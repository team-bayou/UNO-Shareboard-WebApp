import utils from '../utility/utilities';

import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';
import AdOwnerDetails from './AdvertisementOwnerDetails';

import logo from '../../media/images/light.jpg';

export default class Advertisement extends Component {
  render(){
    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top uk-text-center">
            <div className="uk-inline uk-visible-toggle">
              <img src={logo} alt=""/>
              <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large" href="#" data-uk-slidenav-previous></a>
              <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large" href="#" data-uk-slidenav-next></a>
            </div>
          </div>
          <div className="uk-card-header">
            <div className="uk-column-1-2">
              <h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
              <p className="ad-item uk-margin-remove">Price: <span className="uk-label">{utils.getItem(this.props.ad)}</span></p>
            </div>
              <p className="ad-time-published uk-text-meta uk-margin-remove-top">{utils.getDateTime(this.props.ad)}</p>
              <AdCategory category={this.props.ad.category}/>
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
}
