import api from '../utility/api';
import utils from '../utility/utilities';
import constants from '../utility/constants';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdPageList from '../components/listings/ListingPaginationList';
import LoadingNotification from '../components/LoadingNotification';

export default class UserListingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.params.page ? this.props.params.page : 1,
      pages: -1,
      listings: [],
      user: null,
      userExists: false,
      myListings: false,
      totalNumAds: 0
    };
  }

  componentDidMount() {
    // Try to get a list of user's listings and extract length.
    api.getUserListings(this.props.params.id, function(exists, response) {
      if (exists && response) {
        let numOfAds = response.data.length;
        // Determine number of pages.
        let pages = numOfAds / 10 + (numOfAds % 10 === 0 ? 0 : 1);

        this.setState({
          pages: pages,
          totalNumAds: numOfAds
        });
      }
    }.bind(this));

    // Try to get a list of user's listings by page number.
    api.getUserListingsByPage(this.props.params.id, this.state.currentPage, function(exists, response) {
      if (exists && response) {
        this.setState({
          listings: response.data
        });
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
    if (this.state.pages < 0 || !this.state.listings || !this.state.user)
      return (<LoadingNotification />);

    if (!this.state.userExists) {
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <div className="uk-margin uk-text-center">
              The requested user does not exist
            </div>
          </div>
          <AppFooter />
        </div>
      );
    }

    if (this.state.listings.length === 0)
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
              <a href="/listings/add" className="uk-button button-success uk-button-large uk-width-1-1">Create New Listing</a>
            </div>
            : null
          }
          <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
            {
              this.state.myListings ?
              "You do not currently have any listings"
              :
              "This user does not currently have any listings"
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
              <a href="/listings/add" className="uk-button button-success uk-button-large uk-width-1-1">Create New Listing</a>
            </div>
            : null
          }
          <AdPageList listings={this.state.listings} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"users/" + this.props.params.id + "/listings"}
            edit={true} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
