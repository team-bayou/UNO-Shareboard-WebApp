import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import Ad from '../components/listings/Listing';
import LoadingNotification from '../components/LoadingNotification';

export default class ListingDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: null,
      numberOfReviews: 0,

      adNotFound: false
    };
  }

  componentDidMount() {
    // Try to get an listing by id.
    api.getListing(this.props.params.id, function(exists, response) {
      if (exists && response) {
        this.setState({
          listing: response.data,
        });

        // Try to get a list of the owner's reviews and extract only the number of reviews.
        api.getRevieweeReviews(response.data.owner.id, function(exists, response) {
          if (exists && response) {
            this.setState({
              numberOfReviews: response.data.length
            });
          }
          else {
            this.setState({
              numberOfReviews: 0
            });
          }
        }.bind(this));
      }
      else {
        this.setState({
          adNotFound: true
        });
      }
    }.bind(this));
  }

  render() {

    if (this.state.adNotFound)
      return (
        <div id="listing-details" className="app">
          <AppHeader />
          <div className="app-body uk-container">
            <div className="uk-margin-medium-top uk-margin-medium-bottom uk-text-center">
              A listing with the given ID does not exist
            </div>
          </div>
          <AppFooter />
        </div>
      );

    if (!this.state.listing)
      return (<LoadingNotification />);

    return (
      <div id="listing-details" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <Ad key={this.state.listing.id} ad={this.state.listing} reviews={this.state.numberOfReviews}/>
        </div>
        <AppFooter />
      </div>
    );
  }
}
