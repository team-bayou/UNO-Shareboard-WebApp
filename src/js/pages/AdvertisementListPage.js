import api from '../utility/api';
import utils from '../utility/utilities';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdPageList from '../components/advertisements/AdvertisementPaginationList';
import FilterComponent from '../components/FilterComponent';
import LoadingNotification from '../components/LoadingNotification';

export default class AdvertisementsListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.page ? this.props.page : 1,
      pages: -1,
      advertisements: [],
      totalNumAds: 0
    };
  }

  componentDidMount() {
    // Try to get a list of all available advertisements and extract length.
    api.getAdTypeAdvertisements(this.props.adType, function(exists, response) {
      if (exists && response) {
        // Determine number of pages based on the number of advertisements.
        this.setState({
          pages: utils.getNumberOfPages(response.data.length),
          totalNumAds: response.data.length
        });
      } else {
        console.log("No listings found");
      }
    }.bind(this));

    // Try to get a list of all available advertisements by ad type and page number.
    api.getAdTypeAdvertisementsByPage(this.props.adType, this.state.currentPage, function(exists, response) {
      if (exists && response) {
        this.setState({
          advertisements: response.data
        });
      } else {
        console.log("No listings found");
      }
    }.bind(this));
  }

  render() {
    if (this.state.pages < 0 || !this.state.advertisements)
      return (<LoadingNotification />);

    return (
      <div id="listing-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <FilterComponent adType={this.props.adType} />
          <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings (" + this.state.totalNumAds + ")"}</span></h2>
          <AdPageList advertisements={this.state.advertisements} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"advertisements/" + this.props.adType} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
