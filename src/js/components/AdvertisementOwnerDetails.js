import React, { Component } from 'react';

import avatar from '../../media/images/avatar.jpg';

export default class AdvertisementOwnerDetails extends Component {
  render(){
    var routeToUser = "/users/" + this.props.owner.accountName;
    var routeToReviews = routeToUser + "/reviews";

    return (
      <div className="ad-owner">
        <article className="uk-comment">
          <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
              <div className="uk-width-auto">
                <a href={routeToUser}>
                  <img className="ad-owner-image uk-comment-avatar" src={avatar} width="80" height="80" alt="" />
                </a>
              </div>
              <div className="uk-width-expand">
                  <h4 className="ad-owner-account-name uk-comment-title uk-margin-remove"><a href={routeToUser} className="uk-link-reset">{this.props.owner.accountName}</a></h4>
                  <ul className="ad-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                      <li>
                        <a href={"mailto:" + this.props.owner.email} className="ad-owner-email uk-icon-button uk-margin-small-right" data-uk-icon="icon: mail" title={this.props.owner.email} data-uk-tooltip="pos: bottom"></a>
                        <span className="ad-owner-phone uk-icon-button uk-margin-small-right" data-uk-icon="icon: whatsapp" title={this.props.owner.phoneNumber} data-uk-tooltip="pos: bottom" hidden={!this.props.owner.phoneNumber}></span>
                        <a href={"https://www.facebook.com/" + this.props.owner.facebookId} className="ad-owner-facebook uk-icon-button uk-margin-small-right" data-uk-icon="icon: facebook" target="_blank" hidden={!this.props.owner.facebookId}></a>
                        <a href={"https://www.twitter.com/" + this.props.owner.twitterHandle} className="ad-owner-twitter uk-icon-button" data-uk-icon="icon: twitter" target="_blank" hidden={!this.props.owner.twitterHandle}></a>
                      </li>
                      <li><a href={routeToReviews}>{"User Reviews (" + (!this.props.owner.reviews ? "0" : this.props.owner.reviews) + ")"}</a></li>
                  </ul>
              </div>
          </header>
        </article>
      </div>
    );
  }
}
