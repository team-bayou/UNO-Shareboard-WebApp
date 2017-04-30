import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import ListingFeed from '../components/listings/ListingFeed';
import LoadingNotification from '../components/LoadingNotification';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      noListingsFound: false
    };
  }

  componentDidMount() {
    // Try to get a list of the top 10 recent listings.
    api.getListingsByPage(1, function(exists, response) {
      if (exists && response) {
        if (response.data.length === 0) {
          this.setState({
            noListingsFound: true
          });
        }
        else {
          this.setState({
            listings: response.data
          });
        }
      }
    }.bind(this));
  }

  render() {
    if (!this.state.listings)
      return (<LoadingNotification />);

    return (
      <div id="home" className="app">
        <AppHeader />
        <div className="app-body uk-container">

          <div className="uk-child-width-1-3@m" data-uk-grid>
            <div>
              <a href="/listings/seek" className="uk-button uk-button-primary uk-button-large uk-width-1-1">Buying / Seeking</a>
            </div>
            <div>
              <a href="/listings/offer" className="uk-button uk-button-danger uk-button-large uk-width-1-1">Selling / Offering</a>
            </div>
            <div>
              <a href="/listings/add" className="uk-button button-success uk-button-large uk-width-1-1">Create New Listing</a>
            </div>
          </div>

          <div className="uk-flex uk-flex-center uk-margin">
            <a href="#" className="icon-link" data-uk-toggle="target: #whatisthis; mode: click">
              <span className="uk-icon uk-margin-small-right" href="/home" data-uk-icon="icon: question"></span>
              What are these?
            </a>
          </div>

          <div className="uk-flex uk-flex-center uk-margin" id="whatisthis" hidden>
            <div className="uk-placeholder uk-background-muted uk-width-1-2@m">

              <dl className="uk-description-list">
                <dd><strong>BUYING / SEEKING</strong><br />These are listings of items that the submitter is looking to acquire by offering to pay a certain price or trade a certain item for</dd>
                <hr />
                <dd><strong>SELLING / OFFERING</strong><br />These are listings of items that the submitter is offering to sell for a certain price or trade for a certain item</dd>
                <hr />
                <dd><strong>CREATE NEW LISTING</strong><br />Looking for something, or trying to get rid of something? Here you can create a listing describing what is you're looking for or what you're offering</dd>
              </dl>

            </div>
          </div>

          <h2 className="uk-heading-line uk-text-center"><span>Most Recent Listings</span></h2>
          {
            this.state.noListingsFound ?
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              There are currently no listings available to show
            </div>
            : <ListingFeed listings={this.state.listings} />
          }
        </div>

        <AppFooter />
      </div>
    );
  }
}
