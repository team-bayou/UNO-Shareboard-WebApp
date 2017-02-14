import React, { Component } from 'react';
import AdCategoryList from './AdvertisementCategoryList';

import logo from '../../media/images/light.jpg';
import avatar from '../../media/images/avatar.jpg';

export default class Advertisement extends Component {
  render(){
    return (
      <div className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-image uk-card-media-top">
            <div className="uk-position-relative">
              <img src={logo} alt=""/>
              <div className="uk-position-bottom-center uk-position-medium">
                <ul className="uk-dotnav uk-flex-nowrap">
                  <li className="uk-active"><a href="#">Item 1</a></li>
                  <li><a href="#">Item 2</a></li>
                  <li><a href="#">Item 3</a></li>
                  <li><a href="#">Item 4</a></li>
                  <li><a href="#">Item 5</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="uk-card-header">
            <div className="uk-column-1-2">
              <h3 className="ad-title uk-card-title uk-margin-remove-bottom">{this.props.ad.title}</h3>
              <span className="ad-item uk-label uk-margin-remove">{this.getItem()}</span>
            </div>
              <p className="ad-time-published uk-text-meta uk-margin-remove-top">{this.props.ad.time_published}</p>
              <AdCategoryList categories={this.props.ad.categories}/>
          </div>
          <div className="ad-description uk-card-body">
            <p>{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <article className="ad-owner uk-comment">
              <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                      <img className="ad-owner-image uk-comment-avatar" src={avatar} width="80" height="80" alt="" />
                  </div>
                  <div className="uk-width-expand">
                      <h4 className="ad-owner-account-name uk-comment-title uk-margin-remove">{this.props.ad.owner.account_name}</h4>
                      <ul className="ad-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                          <li>
                            <a href={"mailto:" + this.props.ad.owner.email} className="ad-owner-contact-email uk-icon-button uk-margin-small-right" data-uk-icon="icon: mail" title={this.props.ad.owner.email} data-uk-tooltip="pos: bottom"></a>
                            <span className="ad-owner-contact-phone uk-icon-button uk-margin-small-right" data-uk-icon="icon: whatsapp" title={this.props.ad.owner.phone_number} data-uk-tooltip="pos: bottom"></span>
                            <a href={"https://www.facebook.com/" + this.props.ad.owner.facebook_id} className="ad-owner-contact-facebook uk-icon-button uk-margin-small-right" data-uk-icon="icon: facebook" target="_blank"></a>
                            <a href={"https://www.twitter.com/" + this.props.ad.owner.twitter_handle} className="ad-owner-contact-twitter uk-icon-button" data-uk-icon="icon: twitter" target="_blank"></a>
                          </li>
                      </ul>
                  </div>
              </header>
              <div className="uk-comment-body">
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </article>
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
