import api from '../utility/api';
import utils from '../utility/utilities';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import AdPageList from '../components/advertisements/AdvertisementPaginationList';
import LoadingNotification from '../components/LoadingNotification';

export default class SearchResultsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      pages: -1,
      advertisements: [],
      totalNumAds: 0,

      noResultsFound: false
    };
  }

  componentDidMount() {

    if (!this.props.location.query.page || !this.props.location.query.title || !this.props.location.query.adType) {
      this.setState({
        noResultsFound: true
      });
    }

    else {
      this.setState({
        currentPage: this.props.location.query.page
      });

      let data = {
        page: -1,
        title: this.props.location.query.title,
        adType: this.props.location.query.adType
      };
      if (!!this.props.location.query.categoryId)
        data.categoryId = this.props.location.query.categoryId;
      if (!!this.props.location.query.description)
        data.description = this.props.location.query.description;

      api.search(data, function(success, response) {
        if (success) {

          this.setState({
            pages: utils.getNumberOfPages(response.data.length),
            totalNumAds: response.data.length
          });
          data.page = this.props.location.query.page;
          api.search(data, function(success, response) {
            if (success) {
              this.setState({
                advertisements: response.data
              });
            }
            else {
              this.setState({
                noResultsFound: true
              });
            }
          }.bind(this));

        }
        else {
          this.setState({
            noResultsFound: true
          });
        }
      }.bind(this));
    }
  }

  render() {

    if (this.state.noResultsFound) {
      return (
        <div id="ad-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <h2 className="uk-heading-line uk-text-center"><span>{"Search Results (0)"}</span></h2>
            <p className="uk-margin-large-top uk-margin-large-bottom uk-text-center">Your search returned no listings.</p>
          </div>
          <AppFooter />
        </div>
      );
    }

    else if (this.state.pages < 0) {
      return (<LoadingNotification />);
    }

    else {
      return (
        <div id="ad-list" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <h2 className="uk-heading-line uk-text-center"><span>{"Search Results (" + this.state.totalNumAds + ")"}</span></h2>
            <AdPageList advertisements={this.state.advertisements} pages={parseInt(this.state.pages, 10)} currentPage={parseInt(this.state.currentPage, 10)} resource={"advertisements/" + this.props.adType}/>
          </div>
          <AppFooter />
        </div>
      );
    }
  }
}
