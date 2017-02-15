import React, { Component } from 'react';

import avatar from '../../media/images/avatar.jpg';

export default class AdvertisementOwnerDetails extends Component {
  render(){
    var routeToUser = "/users/" + this.props.owner.account_name;
    var routeToReviews = routeToUser + "/reviews";

    return (
      <div className="ad-owner">
        <article className="uk-comment">
          <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
              <div className="uk-width-auto">
                  <img className="ad-owner-image uk-comment-avatar" src={avatar} width="80" height="80" alt="" />
              </div>
              <div className="uk-width-expand">
                  <h4 className="ad-owner-account-name uk-comment-title uk-margin-remove"><a href={routeToUser} className="uk-link-reset">{this.props.owner.account_name}</a></h4>
                  <ul className="ad-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                      <li>
                        <a href={"mailto:" + this.props.owner.email} className="ad-owner-email uk-icon-button uk-margin-small-right" data-uk-icon="icon: mail" title={this.props.owner.email} data-uk-tooltip="pos: bottom"></a>
                        <span className="ad-owner-phone uk-icon-button uk-margin-small-right" data-uk-icon="icon: whatsapp" title={this.props.owner.phone_number} data-uk-tooltip="pos: bottom"></span>
                        <a href={"https://www.facebook.com/" + this.props.owner.facebook_id} className="ad-owner-facebook uk-icon-button uk-margin-small-right" data-uk-icon="icon: facebook" target="_blank"></a>
                        <a href={"https://www.twitter.com/" + this.props.owner.twitter_handle} className="ad-owner-twitter uk-icon-button" data-uk-icon="icon: twitter" target="_blank"></a>
                      </li>
                      <li><a href={routeToReviews}>{"Reviews (" + this.props.owner.reviews + ")"}</a></li>
                  </ul>
              </div>
          </header>
        </article>
      </div>
    );
  }
}
