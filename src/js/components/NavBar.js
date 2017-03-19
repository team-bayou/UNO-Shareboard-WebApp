import React, { Component } from 'react';

import utils from '../utility/utilities';
import constants from '../utility/constants';

import logo from '../../media/images/logo.svg';
import avatar from '../../media/images/avatar.jpg';

export default class NavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAdmin: false
    }
  }

  componentDidMount() {
    utils.verifyAdmin(function(loggedIn, isAdmin) {
      this.setState({
        isAdmin: isAdmin
      });
    }.bind(this));
  }

  render(){
    // Get user id from cookie.
    var routeToUserAds = "/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements";
    var routeToUserReviewsReviewer = "/users/" + utils.getCookie(constants.COOKIE_A) + "/reviewer";
    var routeToUserReviewsReviewee = "/users/" + utils.getCookie(constants.COOKIE_A) + "/reviewee";

    return(
        <nav id="navbar" className="uk-navbar-container" data-uk-navbar="mode: click" data-uk-sticky>
          <div className="uk-navbar-left">
            <img className="uk-navbar-item uk-logo" alt="Logo" src={logo}/>
            <ul className="uk-navbar-nav">
              <li>
                <a href="/home">
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: home"></span>
                  Home
                </a>
              </li>
              <li>
                <a>
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: list"></span>
                  Listings
                </a>
                <div className="navbar-listings uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="/advertisements">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: search"></span>
                        Buy / Seek
                      </a>
                    </li>
                    <li>
                      <a href="/advertisements">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: credit-card"></span>
                        Sell / Offer
                      </a>
                    </li>
                    <li className="uk-nav-divider"></li>
                    <li>
                      <a href={routeToUserAds}>
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: bookmark"></span>
                        My Listings
                      </a>
                      <a href="/advertisements/add">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: file-edit"></span>
                        Create Advertisement
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a>
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: comments"></span>
                  Reviews
                </a>
                <div className="navbar-reviews uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href={routeToUserReviewsReviewer}>
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: comments"></span>
                        My submitted Reviews
                      </a>
                    </li>
                    <li>
                      <a href={routeToUserReviewsReviewee}>
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: comments"></span>
                        My received Reviews
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li hidden={!this.state.isAdmin}>
                <a href="/admin">
                  <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: unlock"></span> Admin
                </a>
              </li>
              <li>
                <a>
                  <span className="uk-margin-small-right">My Account</span>
                  <img className="uk-border-circle uk-margin-small-right" width="40" height="40" src={avatar} alt=""/>
                </a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="/profile">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: user"></span> Profile
                      </a>
                    </li>
                    <li>
                      <a href="/settings">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: cog"></span> Settings
                      </a>
                    </li>
                    <li className="uk-nav-divider"></li>
                    <li>
                      <a href="/logout">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: sign-out"></span> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

        </nav>
    );
  }
}
