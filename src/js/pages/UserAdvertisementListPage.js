import api from '../utility/api';
import utils from '../utility/utilities';
import constants from '../utility/constants';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/advertisements/AdvertisementList';
import CreateButton from '../components/buttons/CreateButton';

export default class UserAdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: [],
      user: null,
      userExists: false,
      myListings: false
    };
  }

  componentDidMount() {
    // Try to get a list of user's advertisements.
    api.getUserAdvertisements(this.props.params.id, function(exists, response){
      if (exists && response){
        this.setState({
          advertisements: response.data
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
    if (!this.state.advertisements || !this.state.user)
      return (<div className="uk-text-center">Loading...</div>);

    if (!this.state.userExists) {
      return (
        <div id="ad-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <div className="uk-margin uk-text-center">
              The requested user does not exist.
            </div>
          </div>
        </div>
      );
    }

    if (this.state.advertisements.length === 0)
      return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>
              {
                this.state.myListings ?
                "Your Current Listings"
                :
                this.state.user.accountName + "'s Current Listings"
              }
            </span>
          </h2>
          {
            this.state.myListings ?
            <div className="uk-width-1-4 uk-margin-large-bottom uk-align-center">
              <CreateButton href={"/advertisements/add"} name={"Create New Listing"} />
            </div>
            : null
          }
          <div className="uk-margin uk-text-center">
            {
              this.state.myListings ?
              "You do not currently have any listings."
              :
              this.state.user.accountName + " does not currently have any listings."
            }
          </div>
        </div>
      </div>
      );

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>
              <span>
                {
                  this.state.myListings ?
                  "Your Current Listings (" + this.state.advertisements.length + ")"
                  :
                  this.state.user.accountName + "'s Current Listings (" + this.state.advertisements.length + ")"
                }
              </span>
            </span>
          </h2>
          {
            this.state.myListings ?
            <div className="uk-width-1-4 uk-margin-large-bottom uk-align-center">
              <CreateButton href={"/advertisements/add"} name={"Create New Listing"} />
            </div>
            : null
          }
          <AdList advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
