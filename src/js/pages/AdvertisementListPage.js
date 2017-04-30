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
      totalNumAds: 0,

      problemLoadingPage: false
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
        this.setState({
          problemLoadingPage: true
        });
      }
    }.bind(this));

    // Try to get a list of all available advertisements by ad type and page number.
    api.getAdTypeAdvertisementsByPage(this.props.adType, this.state.currentPage, function(exists, response) {
      if (exists && response) {
        this.setState({
          advertisements: response.data
        });
      } else {
        this.setState({
          problemLoadingPage: true
        });
      }
    }.bind(this));
  }

  render() {
    var listingType = this.props.adType === "seek" ? "Seeking" : "Offering";

    if (this.state.pages < 0 || !this.state.advertisements)
      return (<LoadingNotification />);

    if (this.state.pages === 0)
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <FilterComponent adType={this.props.adType} />
            <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings : " + listingType + " (" + this.state.totalNumAds + ")"}</span></h2>
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              There are currently no listings available to show
            </div>
          </div>
          <AppFooter />
        </div>
      );

    if (this.state.problemLoadingPage)
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <FilterComponent adType={this.props.adType} />
            <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings : " + listingType + " (" + this.state.totalNumAds + ")"}</span></h2>
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p><span data-uk-icon="icon: warning"></span> There was a problem loading the listings. Please try again, or contact us if the problem continues.</p>
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      );

    return (
      <div id="listing-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <FilterComponent adType={this.props.adType} />
          <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings : " + listingType + " (" + this.state.totalNumAds + ")"}</span></h2>
          <AdPageList advertisements={this.state.advertisements} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"advertisements/" + this.props.adType} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
