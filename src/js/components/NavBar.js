import React, { Component } from 'react';

import utils from '../utility/utilities';
import constants from '../utility/constants';

import logo from '../../media/images/logo.svg';
import avatar from '../../media/images/avatar_placeholder.png';

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
    var id = utils.getCookie(constants.COOKIE_A);
    var routeToUserAds = "/users/" + id + "/advertisements";
    var routeToUserReviewsReviewer = "/reviews/reviewer/" + id;
    var routeToUserReviewsReviewee = "/reviews/reviewee/" + id;

    return(
      <div>


        {/*
          BEGIN DESKTOP NAV BAR
        */}
        <nav id="navbar" className="uk-navbar-container uk-visible@m" data-uk-navbar="mode: click" data-uk-sticky>
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
                      <a href="/advertisements/seek">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: search"></span>
                        Buy / Seek
                      </a>
                    </li>
                    <li>
                      <a href="/advertisements/offer">
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
                        Create New Listing
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
              {
                this.state.isAdmin ?
                <li>
                  <a href="/admin">
                    <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: unlock"></span> Admin
                  </a>
                </li>
                : null
              }
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
                      <a href="/profile/edit">
                        <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: cog"></span> Edit Profile
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

        {/*
          END DESKTOP NAV BAR

          BEGIN MOBILE NAV BAR
        */}

        <nav id="navbar" className="uk-navbar-container uk-hidden@m" data-uk-navbar="mode: click">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <a className="uk-navbar-toggle" href="#" data-uk-toggle="target: #side-menu">
                  <span data-uk-icon="icon: menu; ratio: 1.5"></span> <span className="uk-margin-small-left">Menu</span>
                </a>

                <div id="side-menu" data-uk-offcanvas="mode: reveal; overlay: true">
                  <div className="uk-offcanvas-bar">

                    <ul className="uk-nav uk-nav-default">
                      <li><a href="/home"><span className="uk-margin-small-right" data-uk-icon="icon: home"></span>Home</a></li>

                      <li className="uk-nav-header">Listings</li>
                      <li className="uk-parent">
                        <ul className="uk-nav-sub">
                          <li><a href="/advertisements/seek"><span className="uk-margin-small-right" data-uk-icon="icon: search"></span>Buy / Seek</a></li>
                          <li><a href="/advertisements/offer"><span className="uk-margin-small-right" data-uk-icon="icon: credit-card"></span>Sell / Offer</a></li>
                          <li><a href={routeToUserAds}><span className="uk-margin-small-right" data-uk-icon="icon: bookmark"></span>My Listings</a></li>
                          <li><a href="/advertisements/add"><span className="uk-margin-small-right" data-uk-icon="icon: file-edit"></span>Create Listing</a></li>
                        </ul>
                      </li>

                      <li className="uk-nav-header">Reviews</li>
                      <li className="uk-parent">
                        <ul className="uk-nav-sub">
                          <li><a href={routeToUserReviewsReviewer}><span className="uk-margin-small-right" data-uk-icon="icon: comments"></span>My Submitted Reviews</a></li>
                          <li><a href={routeToUserReviewsReviewee}><span className="uk-margin-small-right" data-uk-icon="icon: comments"></span>My Received Reviews</a></li>
                        </ul>
                      </li>

                      <li className="uk-nav-header">My Account</li>
                      <li className="uk-parent">
                        <ul className="uk-nav-sub">
                          <li><a href="/profile"><span className="uk-margin-small-right" data-uk-icon="icon: user"></span>Profile</a></li>
                          <li><a href="/profile/edit"><span className="uk-margin-small-right" data-uk-icon="icon: cog"></span>Edit Profile</a></li>
                          <li><a href="/logout"><span className="uk-margin-small-right" data-uk-icon="icon: sign-out"></span>Logout</a></li>
                        </ul>
                      </li>

                      {
                        this.state.isAdmin ?
                        <li className="uk-nav-divider"></li>
                        : null
                      }
                      {
                        this.state.isAdmin ?
                        <li><a href="/admin"><span className="uk-margin-small-right" data-uk-icon="icon: unlock"></span>Admin</a></li>
                        : null
                      }
                    </ul>

                  </div>
                </div>


              </li>
            </ul>
          </div>
        </nav>

        {/*
          END MOBILE NAV BAR
        */}

      </div>
    );
  }
}
