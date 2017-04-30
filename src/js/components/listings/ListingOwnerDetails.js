import React, { Component } from 'react';

import placeholder from '../../../media/images/avatar_placeholder.png';

const utils = require('../../utility/utilities');
const constants = require('../../utility/constants');

export default class ListingOwnerDetails extends Component {
  render() {
    var routeToUser = "/users/" + this.props.owner.id;
    var routeToReviews = routeToUser + "/reviews";

    return (
      <div className="listing-owner">
        <article className="uk-comment">
          <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
              <div className="uk-width-auto">
                <a href={routeToUser}>
                  <img className="ad-owner-image uk-comment-avatar" src={!!this.props.owner.imageId ? constants.HOST + "/service/v1/images/get/" + this.props.owner.imageId : placeholder} width="80" height="80" alt="" />
                </a>
              </div>
              <div className="uk-width-expand">
                  <h4 className="listing-owner-account-name uk-comment-title uk-margin-remove"><a href={routeToUser} className="uk-link-reset">{this.props.owner.accountName}</a></h4>
                  <ul className="listing-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                    {
                      !this.props.owner.showEmail && (!this.props.owner.showPhoneNumber || !this.props.owner.phoneNumber) ? null :
                      <li>
                        {
                          this.props.owner.showEmail ?
                          <a href={"mailto:" + this.props.owner.email} className="listing-owner-email uk-icon-button uk-margin-small-right" data-uk-icon="icon: mail" title={this.props.owner.email} data-uk-tooltip="pos: bottom"></a>
                          : null
                        }
                        {
                          this.props.owner.showPhoneNumber && !!this.props.owner.phoneNumber ?
                          <span className="listing-owner-phone uk-icon-button uk-margin-small-right" data-uk-icon="icon: whatsapp" title={utils.prettifyPhone(this.props.owner.phoneNumber)} data-uk-tooltip="pos: bottom"></span>
                          : null
                        }
                        {
                          !!this.props.owner.facebookId ?
                          <a href={"https://www.facebook.com/" + this.props.owner.facebookId} className="listing-owner-facebook uk-icon-button uk-margin-small-right" data-uk-icon="icon: facebook" target="_blank"></a>
                          : null
                        }
                        {
                          !!this.props.owner.twitterHandle ?
                          <a href={"https://www.twitter.com/" + this.props.owner.twitterHandle} className="listing-owner-twitter uk-icon-button" data-uk-icon="icon: twitter" target="_blank"></a>
                          : null
                        }
                      </li>
                    }
                      <li><a href={routeToReviews}>{"User Reviews (" + this.props.reviews + ")"}</a></li>
                  </ul>
              </div>
          </header>
        </article>
      </div>
    );
  }
}
