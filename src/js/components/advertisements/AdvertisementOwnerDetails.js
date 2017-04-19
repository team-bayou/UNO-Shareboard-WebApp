import React, { Component } from 'react';
import ReportForm from '../ReportForm';

import placeholder from '../../../media/images/avatar_placeholder.png';

const utils = require('../../utility/utilities');
const constants = require('../../utility/constants');

export default class AdvertisementOwnerDetails extends Component {
  render(){
    var routeToUser = "/users/" + this.props.owner.id;
    var routeToReviews = routeToUser + "/reviews";

    return (
      <div className="ad-owner">
        <article className="uk-comment">
          <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
              <div className="uk-width-auto">
                <a href={routeToUser}>
                  <img className="ad-owner-image uk-comment-avatar" src={!!this.props.owner.imageId ? constants.HOST + "/service/v1/images/get/" + this.props.owner.imageId : placeholder} width="80" height="80" alt="" />
                </a>
              </div>
              <div className="uk-width-expand">
                  <h4 className="ad-owner-account-name uk-comment-title uk-margin-remove"><a href={routeToUser} className="uk-link-reset">{this.props.owner.accountName}</a></h4>
                  <ul className="ad-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                      <li>
                        <a href={"mailto:" + this.props.owner.email} className="ad-owner-email uk-icon-button uk-margin-small-right" data-uk-icon="icon: mail" title={this.props.owner.email} data-uk-tooltip="pos: bottom" hidden={!this.props.owner.showEmail}></a>
                        <span className="ad-owner-phone uk-icon-button uk-margin-small-right" data-uk-icon="icon: whatsapp" title={utils.prettifyPhone(this.props.owner.phoneNumber)} data-uk-tooltip="pos: bottom" hidden={!this.props.owner.phoneNumber || !this.props.owner.showPhoneNumber}></span>
                        <a href={"https://www.facebook.com/" + this.props.owner.facebookId} className="ad-owner-facebook uk-icon-button uk-margin-small-right" data-uk-icon="icon: facebook" target="_blank" hidden={!this.props.owner.facebookId}></a>
                        <a href={"https://www.twitter.com/" + this.props.owner.twitterHandle} className="ad-owner-twitter uk-icon-button" data-uk-icon="icon: twitter" target="_blank" hidden={!this.props.owner.twitterHandle}></a>
                      </li>
                      <li><a href={routeToReviews}>{"User Reviews (" + this.props.reviews + ")"}</a></li>
                      {
                        this.props.owner.id + "" === utils.getCookie(constants.COOKIE_A) + "" ? null :
                        <li><a href="#report-listing" data-uk-toggle>Report Listing</a></li>
                      }
                  </ul>
              </div>
          </header>
        </article>

        {
          this.props.owner.id + "" === utils.getCookie(constants.COOKIE_A) + "" ? null :
          <div id="report-listing" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title uk-text-center">Report Listing</h2>
              <ReportForm reportedUserID={this.props.owner.id} reportedAdID={this.props.ad.id} />
            </div>
          </div>
        }

      </div>
    );
  }
}
