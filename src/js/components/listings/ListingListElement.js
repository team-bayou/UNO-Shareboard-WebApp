import React, { Component } from 'react';
import AdCard from './ListingCard';

import noimage from '../../../media/images/no_image.png';
import placeholder from '../../../media/images/avatar_placeholder.png';

const constants = require('../../utility/constants');
const utils = require('../../utility/utilities');

export default class ListingListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false
    };
  }

  componentDidMount() {
    utils.verifyAdmin(function(l, a) {
      this.setState({
        isAdmin: a
      });
    }.bind(this));
  }

  render() {
    var routeToUser = "/users/" + this.props.ad.owner.id;
    var media = (
      <a href={"/listings/" + this.props.ad.id}>
        <img src={this.props.ad.imageIDs.length > 0 ? constants.HOST + "/service/v1/images/get/" + this.props.ad.imageIDs[0] : noimage} alt=""/>
      </a>
    );
    var body = (<p className="uk-text-truncate">{this.props.ad.description}</p>);
    var footer = (
      <div>
        <a href={"/listings/" + this.props.ad.id} className="listing-details uk-button uk-button-text">Details</a>
        <div className="listing-owner uk-float-right uk-width-auto">
          <a href={routeToUser} title={this.props.ad.owner.accountName} data-uk-tooltip="pos: bottom">
            <img className="uk-border-circle small-profile-image" width="40" height="40" src={!!this.props.ad.owner.imageId ? constants.HOST + "/service/v1/images/get/" + this.props.ad.owner.imageId : placeholder} alt=""/>
          </a>
        </div>
      </div>
    );

    return (
      <AdCard ad={this.props.ad} media={media} body={body} footer={footer} edit={this.props.ad.owner.id + "" === utils.getCookie(constants.COOKIE_A) || this.state.isAdmin}/>
    );
  }
}
