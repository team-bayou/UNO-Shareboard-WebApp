import React, { Component } from 'react';

import utils from '../utility/utilities';
import constants from '../utility/constants';

import logo from '../../media/images/logo.svg';
import avatar from '../../media/images/avatar.jpg';

export default class NavBar extends Component {
  render(){
    // Get user id from cookie.
    var routeToUserAds = "/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements";

    return(
        <nav id="navbar" className="uk-navbar-container" data-uk-navbar data-uk-sticky>

          <div className="uk-navbar-left">
            <img className="uk-navbar-item uk-logo" alt="Logo" src={logo}/>
            <ul className="uk-navbar-nav">
              <li>
                <a href="/home">
                  <span className="uk-icon uk-margin-small-right" href="/home" data-uk-icon="icon: home"></span>
                  Home
                </a>
              </li>
              <li><a href="/advertisements">Buy</a></li>
              <li><a href="/advertisements">Sell</a></li>
            </ul>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a href="/profile">
                  <span style={{marginRight: '10px'}}>My Account</span>
                  <img style={{marginRight: '20px'}} className="uk-border-circle" width="40" height="40" src={avatar} alt=""/>
                </a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li><a href={routeToUserAds}><span data-uk-icon="icon: list"></span> My Listings</a></li>
                    <li><a href="#"><span data-uk-icon="icon: comment"></span> My Reviews</a></li>
                    <li><a href="#"><span data-uk-icon="icon: cog"></span> Settings</a></li>
                    <li className="uk-nav-divider"></li>
                    <li><a href="/logout"><span data-uk-icon="icon: sign-out"></span> Logout</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

        </nav>
    );
  }
}
