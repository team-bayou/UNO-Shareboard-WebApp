import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

import avatar from '../../media/images/avatar_placeholder.png';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      myProfile: false
    };
  }

  componentDidMount() {
    const user = !!this.props.params.id ? this.props.params.id : utils.getCookie(constants.COOKIE_A);

    api.getUserByID(user, function(exists, response) {
      if (exists) {
        this.setState({
          user: response.data,
          myProfile: (response.data.id + "") === (utils.getCookie(constants.COOKIE_A) + "")
        });
      }
      else {
        this.setState({
          user: -1
        });
      }
    }.bind(this));
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="uk-text-center">Loading...</div>
      );
    }

    else if (this.state.user === -1) {
      return (
        <div id="profile">
          <AppHeader />
          <div className="app-body uk-container uk-text-break">
            <div className="uk-grid-large uk-grid-divider" data-uk-grid>
              <div className="uk-width-1-1 uk-text-center">
                The requested user does not exist.
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      );
    }

    else {
      return (
        <div id="profile">
          <AppHeader />
          <div className="app-body uk-container uk-text-break">

            <div className="uk-margin-medium-bottom">
              <h2 className="uk-heading-line uk-text-center">
                <span>
                {
                  this.state.myProfile ? "Your Profile" : this.state.user.accountName + "'s Profile"
                }
                </span>
              </h2>
            </div>

            <div className="uk-grid-large uk-grid-divider" data-uk-grid>
              <div className="uk-width-1-3@m uk-text-center uk-cover-container">
                <img src={avatar} alt={this.state.user.accountName + "'s Avatar"} />
              </div>
              <div className="uk-width-1-3@m">

                <table className="uk-table uk-table-small uk-table-middle user-profile-table uk-text-center info-list">
                  <tbody>
                    <tr>
                      <td className="user-profile-title uk-table-shrink"><span title="Username" data-uk-icon="icon: tag" data-uk-tooltip></span></td>
                      <td className="user-profile-content">{this.state.user.accountName}</td>
                    </tr>
                    <tr>
                      <td className="user-profile-title uk-table-shrink"><span title="Name" data-uk-icon="icon: user" data-uk-tooltip></span></td>
                      <td className="user-profile-content">{(!!this.state.user.firstName ? this.state.user.firstName + " " : "") + (!!this.state.user.lastName ? this.state.user.lastName : "")}</td>
                    </tr>
                    <tr>
                      <td className="user-profile-title uk-table-shrink"><span title="E-mail" data-uk-icon="icon: mail" data-uk-tooltip></span></td>
                      <td className="user-profile-content uk-table-link"><a className="uk-link-reset" href={"mailto:" + this.state.user.email}> {this.state.user.email}</a></td>
                    </tr>
                    <tr>
                      <td className="user-profile-title uk-table-shrink"><span title="Phone" data-uk-icon="icon: phone" data-uk-tooltip></span></td>
                      <td className="user-profile-content">{utils.prettifyPhone(this.state.user.phoneNumber)}</td>
                    </tr>
                    {
                      this.state.myProfile ?
                      <tr className="user-profile-borderless-row">
                        <td colSpan="2"><a className="uk-button uk-button-secondary" href="/profile/edit"><span data-uk-icon="icon: pencil"></span> Edit Profile</a></td>
                      </tr>
                      : null
                    }
                    {
                      this.state.myProfile ?
                      <tr className="user-profile-borderless-row">
                        <td colSpan="2" className="uk-text-small"><strong>Note:</strong> Any fields that you mark hidden will be hidden to other users</td>
                      </tr>
                      : null
                    }
                  </tbody>
                </table>

              </div>
              <div className="uk-width-1-3@m">
                <ul className="uk-list info-list uk-text-center">
                  <li>
                    {
                      this.state.myProfile ?
                      <a className="uk-button uk-button-primary uk-width-1-1" href={"/users/" + this.state.user.id + "/advertisements"}><span data-uk-icon="icon: list"></span> View your listings</a>
                      :
                      <a className="uk-button uk-button-primary uk-width-1-1" href={"/users/" + this.state.user.id + "/advertisements"}><span data-uk-icon="icon: list"></span> View this user's listings</a>
                    }
                  </li>
                  <li>
                    {
                      this.state.myProfile ?
                      <a className="uk-button uk-button-primary uk-width-1-1" href={"/users/" + this.state.user.id + "/reviews"}><span data-uk-icon="icon: comments"></span> View your reviews</a>
                      :
                      <a className="uk-button uk-button-primary uk-width-1-1" href={"/users/" + this.state.user.id + "/reviews"}><span data-uk-icon="icon: comments"></span> View this user's reviews</a>
                    }
                  </li>
                  {
                    this.state.myProfile ?
                    null
                    :
                    <hr />
                  }
                  {
                    this.state.myProfile ?
                    null
                    :
                    <li>
                      <a className="uk-button button-success uk-width-1-1" href={"/users/" + this.state.user.id + "/reviews/add"}><span data-uk-icon="icon: pencil"></span> Review This User</a>
                    </li>
                  }
                </ul>
              </div>
            </div>

          </div>
          <AppFooter />
        </div>
      );
    }
  }
}
