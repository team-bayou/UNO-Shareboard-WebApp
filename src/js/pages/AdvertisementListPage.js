import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdPageList from '../components/advertisements/AdvertisementPaginationList';

export default class AdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentPage: this.props.params.page ? this.props.params.page : 1,
      pages: -1,
      advertisements: []
    };
  }

  componentDidMount() {
    // Try to get a list of all available advertisements and extract length.
    api.getAdvertisements(function(exists, response){
      if (exists && response){
        let numOfAds = response.data.length;
        // Determine number of pages.
        let pages = numOfAds / 10 + (numOfAds % 10 === 0 ? 0 : 1);

        this.setState({
          pages: pages
        });
      } else {
        console.log("No advertisements found");
      }
    }.bind(this));

    // Try to get a list of all available advertisements by page number.
    api.getAdvertisementsByPage(this.state.currentPage, function(exists, response){
      if (exists && response){
        this.setState({
          advertisements: response.data
        });
      } else {
        console.log("No advertisements found");
      }
    }.bind(this));
  }

  render() {
    if (this.state.pages <= 0 || !this.state.advertisements)
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings (" + this.state.advertisements.length + ")"}</span></h2>
          <AdPageList advertisements={this.state.advertisements} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"advertisements"}/>
        </div>
      </div>
    );
  }
}
