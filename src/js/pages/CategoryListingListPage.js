import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdPageList from '../components/listings/ListingPaginationList';
import LoadingNotification from '../components/LoadingNotification';

export default class CategoryListingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.params.page ? this.props.params.page : 1,
      pages: -1,
      category: "",
      listings: [],
      totalNumAds: 0,

      problemLoadingPage: false
    };
  }

  componentDidMount() {

    api.getCategories(function(success, response) {
      if (response.data.length > 0) {
        var catFound = false;
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].id + "" === this.props.params.id + "") {
            this.setState({
              category: response.data[i].title
            });
            catFound = true;
          }
        }
        if (!catFound) {
          this.setState({
            problemLoadingPage: true
          });
        }
      }
    }.bind(this));

    // Try to get a list of category's listings and extract length.
    api.getCategoryListings(this.props.params.id, function(exists, response) {
      if (exists && response) {
        let numOfAds = response.data.length;
        // Determine number of pages.
        let pages = numOfAds / 10 + (numOfAds % 10 === 0 ? 0 : 1);

        this.setState({
          pages: pages,
          totalNumAds: numOfAds
        });
      } else {
        this.setState({
          problemLoadingPage: true
        });
      }
    }.bind(this));

    // Try to get a list of category's listings by page number.
    api.getCategoryListingsByPage(this.props.params.id, this.state.currentPage, function(exists, response) {
      if (exists && response) {
        this.setState({
          listings: response.data
        });
      } else {
        this.setState({
          problemLoadingPage: true
        });
      }
    }.bind(this));
  }

  render() {

    if (this.state.problemLoadingPage)
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings (" + this.state.totalNumAds + ")"}</span></h2>
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p><span data-uk-icon="icon: warning"></span> There was a problem loading the category's listings. Please try again, or contact us if the problem continues.</p>
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      );

    if (this.state.pages < 0 || !this.state.listings)
      return (<LoadingNotification />);

    if (this.state.pages === 0)
      return (
        <div id="listing-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings : \"" + this.state.category + "\" (" + this.state.totalNumAds + ")"}</span></h2>
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              There are currently no listings available to show
            </div>
          </div>
          <AppFooter />
        </div>
      );

    return (
      <div id="listing-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings : \"" + this.state.category + "\" (" + this.state.totalNumAds + ")"}</span></h2>
          <AdPageList listings={this.state.listings} pages={parseInt(this.state.pages, 10)}
            currentPage={parseInt(this.state.currentPage, 10)} resource={"listings/categories/" + this.props.params.id}/>
        </div>
        <AppFooter />
      </div>
    );
  }
}
