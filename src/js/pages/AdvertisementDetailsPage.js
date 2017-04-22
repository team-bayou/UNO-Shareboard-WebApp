import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import Ad from '../components/advertisements/Advertisement';

export default class AdvertisementDetailsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisement: null,
      numberOfReviews: 0
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get an advertisement by id.
    api.getAdvertisement(this.props.params.id, function(exists, response){
      if (exists && response){
        let advertisement = response.data;

        // Try to get a list of the owner's reviews and extract only the number of reviews.
        api.getRevieweeReviews(response.data.owner.id, function(exists, response){
          if (exists && response){
            self.setState({
              advertisement: advertisement,
              numberOfReviews: response.data.length
            });
          }
          else {
            console.log("No reviews found");
          }
        });
      }
      else {
        console.log("No advertisement found");
      }
    });
  }

  render() {
    if (!this.state.advertisement)
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="listing-details" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <Ad key={this.state.advertisement.id} ad={this.state.advertisement} reviews={this.state.numberOfReviews}/>
        </div>
        <AppFooter />
      </div>
    );
  }
}
