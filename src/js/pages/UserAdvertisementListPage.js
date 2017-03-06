import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/AdvertisementList';

export default class UserAdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of user's advertisements.
    api.getUserAdvertisements(this.props.params.id, function(response){
      if (response){
        self.setState({
          advertisements: response
        });
      } else {
        console.log("No advertisements found");
      }
    });
  }

  render() {
    if (!this.state.advertisements)
      return (<div className="uk-text-center">Loading...</div>);

    if (this.state.advertisements.length === 0)
      return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>Your Current Listings</span></h2>
          <a href="/advertisements/add" className="button-success uk-button uk-button-large uk-width-1-4 uk-margin-large-bottom uk-align-center">Create New Advertisement</a>

          <div className="uk-margin uk-text-center">
            You do not currently have any listings.
          </div>

        </div>
      </div>
      );

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>Your Current Listings</span></h2>
          <a href="/advertisements/add" className="button-success uk-button uk-button-large uk-width-1-4 uk-margin-large-bottom uk-align-center">Create New Advertisement</a>
          <AdList advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
