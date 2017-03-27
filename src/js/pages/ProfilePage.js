import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

import avatar from '../../media/images/avatar_placeholder.png';

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
              <h2 className="uk-heading-line uk-text-center"><span>Your Profile</span></h2>
            </div>

            <div className="uk-grid-large uk-grid-divider" data-uk-grid>
              <div className="uk-width-1-3@s uk-text-center uk-cover-container">
                <img src={avatar} alt={this.state.user.accountName + "'s Avatar"} />
              </div>
              <div className="uk-width-2-3@s">
                <ul className="uk-list info-list">
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
                  {/*
                  <li>
                    {
                      !!this.state.user.facebookId ?
                      <a href={"https://www.facebook.com/" + this.state.user.facebookId} target="_blank">this.state.user.facebookId</a>
                      :
                      "No Facebook"
                    }
                  </li>
                  <li>
                    {
                      !!this.state.user.twitterHandle ?
                      <a href={"https://www.twitter.com/" + this.state.user.twitterHandle} target="_blank">this.state.user.twitterHandle</a>
                      :
                      "No Twitter"
                    }
                  </li>
                  */}
                </ul>
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}
