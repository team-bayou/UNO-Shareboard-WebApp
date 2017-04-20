import React, { Component } from 'react';
import AdCard from './AdvertisementCard';

import logo from '../../../media/images/light.jpg';
import placeholder from '../../../media/images/avatar_placeholder.png';

const constants = require('../../utility/constants');

export default class AdvertisementListElement extends Component {
  render(){
    var routeToUser = "/users/" + this.props.ad.owner.id;
    var media = (
      <a href={"/advertisements/" + this.props.ad.id}>
        <img src={logo} alt=""/>
      </a>
    );
    var body = (<p className="uk-text-truncate">{this.props.ad.description}</p>);
    var footer = (
      <div>
        <a href={"/advertisements/" + this.props.ad.id} className="ad-details uk-button uk-button-text">Details</a>
        <div className="ad-owner uk-float-right uk-width-auto">
          <a href={routeToUser} title={this.props.ad.owner.accountName} data-uk-tooltip="pos: bottom">
            <img className="uk-border-circle" width="40" height="40" src={this.props.ad.owner.imageId + "" !== -1 + "" && !!this.props.ad.owner.imageId ? constants.HOST + "/service/v1/images/get/" + this.props.ad.owner.imageId : placeholder} alt=""/>
          </a>
        </div>
      </div>
    );

    return (
      <AdCard ad={this.props.ad} media={media} body={body} footer={footer} edit={this.props.edit}/>
    );
  }
}
