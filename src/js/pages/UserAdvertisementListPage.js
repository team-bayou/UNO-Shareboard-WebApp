import api from '../utility/api';
import utils from '../utility/utilities';
import constants from '../utility/constants';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdPageList from '../components/advertisements/AdvertisementPaginationList';

export default class UserAdvertisementsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.params.page ? this.props.params.page : 1,
      pages: -1,
      advertisements: [],
      user: null,
      userExists: false,
      myListings: false,
      totalNumAds: 0
    };
  }

  componentDidMount() {
    // Try to get a list of user's advertisements and extract length.
    api.getUserAdvertisements(this.props.params.id, function(exists, response) {
      if (exists && response) {
        let numOfAds = response.data.length;
        // Determine number of pages.
        let pages = numOfAds / 10 + (numOfAds % 10 === 0 ? 0 : 1);

        this.setState({
          pages: pages,
          totalNumAds: numOfAds
        });
      } else {
        console.log("No listings found");
      }
    }.bind(this));

    // Try to get a list of user's advertisements by page number.
    api.getUserAdvertisementsByPage(this.props.params.id, this.state.currentPage, function(exists, response) {
      if (exists && response) {
        this.setState({
          advertisements: response.data
        });
      } else {
        console.log("No listings found");
      }
    }.bind(this));

    api.getUserByID(this.props.params.id, function(exists, response) {
      if (exists) {
        this.setState({
          user: response.data,
          userExists: true,
          myListings: (this.props.params.id + "") === (utils.getCookie(constants.COOKIE_A) + "")
        });
      }
      else {
        this.setState({
          user: -1,
          userExists: false
        });
      }
    }.bind(this));
  }

  render() {
    if (this.state.pages < 0 || !this.state.advertisements || !this.state.user)
      return (<div className="uk-text-center">Loading...</div>);

    if (!this.state.userExists) {
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <div className="uk-margin uk-text-center">
              The requested user does not exist.
            </div>
          </div>
          <AppFooter />
        </div>
      );
    }

    if (this.state.advertisements.length === 0)
      return (
      <div id="listing-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>
              {
                this.state.myListings ?
                "Your Current Listings (0)"
                :
                this.state.user.accountName + "'s Current Listings (0)"
              }
            </span>
          </h2>
          {
            this.state.myListings ?
            <div className="uk-width-1-3@m uk-margin-large-bottom uk-align-center">
              <a href="/advertisements/add" className="uk-button button-success uk-button-large uk-width-1-1">Create New Listing</a>
            </div>
            : null
          }
          <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
            {
              this.state.myListings ?
              "You do not currently have any listings."
              :
              this.state.user.accountName + " does not currently have any listings."
            }
          </div>
        </div>
        <AppFooter />
      </div>
      );

    return (
      <div id="listing-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>
              <span>
                {
                  this.state.myListings ?
                  "Your Current Listings (" + this.state.totalNumAds + ")"
                  :
                  this.state.user.accountName + "'s Current Listings (" + this.state.totalNumAds + ")"
                }
              </span>
            </span>
          </h2>
          {
            this.state.myListings ?
            <div className="uk-width-1-3@m uk-margin-large-bottom uk-align-center">
              <a href="/advertisements/add" className="uk-button button-success uk-button-large uk-width-1-1">Create New Listing</a>
            </div>
            : null
          }
          <AdPageList advertisements={this.state.advertisements} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"users/" + this.props.params.id + "/advertisements"}
            edit={true} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
