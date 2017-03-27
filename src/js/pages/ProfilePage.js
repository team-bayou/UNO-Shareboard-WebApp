import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

import avatar from '../../media/images/avatar.jpg';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    api.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
      this.setState({
        user: response.data
      });
    }.bind(this));
  }

  render() {

    if (!this.state.user) {
      return (
        <div className="uk-text-center">Loading...</div>
      );
    }

    else {
      return (
        <div id="profile">
          <AppHeader />
          <div className="app-body uk-container uk-text-break">

            <div className="uk-margin-medium-bottom">
              <h2 className="uk-heading-line uk-text-center"><span>Profile</span></h2>
            </div>

            <div className="ad-owner">
              <article className="uk-comment">
                <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                  <div className="uk-width-auto">
                    <img className="ad-owner-image uk-comment-avatar" src={avatar} width="80" height="80" alt="" />
                  </div>
                  <div className="uk-width-expand">
                    <ul className="ad-owner-contact uk-comment-meta uk-subnav uk-subnav-divider">
                      <li>
                        {this.state.user.accountName}
                      </li>
                      <li>
                        {(this.state.user.firstName || "---") + " " + (this.state.user.lastName || "---")}
                      </li>
                      <li>
                        {this.state.user.email}
                      </li>
                      <li>
                        {this.state.user.phoneNumber}
                      </li>
                      <li>
                        <a href={"https://www.facebook.com/" + this.state.user.facebookId} className="ad-owner-facebook" target="_blank">{this.state.user.facebookId || "No Facebook"}</a>
                      </li>
                      <li>
                        <a href={"https://www.twitter.com/" + this.state.user.twitterHandle} className="ad-owner-twitter" target="_blank">{this.state.user.twitterHandle || "No Twitter"}</a>
                      </li>
                      <li>
                        {"User Reviews (" + (!this.state.user.reviews ? "0" : this.state.user.reviews) + ")"}
                      </li>
                    </ul>
                  </div>
                </header>
              </article>
            </div>

          </div>
        </div>
      );
    }
  }
}
