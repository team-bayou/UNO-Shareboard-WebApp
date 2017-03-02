import axios from 'axios';
import constants from '../utility/constants';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import Ad from '../components/Advertisement';

export default class AdvertisementDetailsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      ad: null
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of available advertisements.
    axios.get(constants.HOST + '/service/v1/advertisements/' + this.props.params.id)
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          self.setState({
            ad: response.data
          });
        }
        else {
          console.log("No advertisement found");
        }
      });
  }

  render() {
    if (this.state.ad === null)
      return (<div>Loading...</div>);

    return (
      <div id="ad-details" className="app">
        <AppHeader />
        <div className="app-body uk-container">
            <Ad key={this.state.ad.id} ad={this.state.ad}/>
        </div>
      </div>
    );
  }
}
