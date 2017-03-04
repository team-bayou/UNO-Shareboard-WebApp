import React, { Component } from 'react';

import utils from '../utility/utilities';
import constants from '../utility/constants';

import logo from '../../media/images/logo.svg';
import avatar from '../../media/images/avatar.jpg';

class NavBar extends Component {
  render(){
    // Get user id from cookie.
    var routeToUserAds = "/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements";

    return(
        <nav id="navbar" className="uk-navbar-container" data-uk-navbar data-uk-sticky>
          <div className="uk-navbar-left">
            <img className="uk-navbar-item uk-logo" alt="Logo" src={logo}/>
            <ul className="uk-navbar-nav">
              <li><a href="/home">Home</a></li>
              <li><a href="/advertisements">Buy</a></li>
              <li><a href="/advertisements">Sell</a></li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a href="#">
                  <span style={{marginRight: '10px'}}>Account</span>
                  <img style={{marginRight: '10px'}} className="uk-border-circle" width="40" height="40" src={avatar} alt=""/>
                </a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-nav-header">Personal</li>
                    <li><a href={routeToUserAds}>Advertisements</a></li>
                    <li><a href="#">Reviews</a></li>
                    <li><a href="#">Settings</a></li>
                    <li className="uk-nav-divider"></li>
                    <li><a href="/logout">Logout <span data-uk-icon="icon: sign-out"></span></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default NavBar;
