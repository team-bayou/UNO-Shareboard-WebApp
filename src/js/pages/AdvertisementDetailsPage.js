import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import Ad from '../components/Advertisement';

export default class AdvertisementDetailsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisement: null
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get an advertisement by id.
    api.getAdvertisement(this.props.params.id, function(response){
      if (response){
        self.setState({
          advertisement: response
        });
      }
      else {
        console.log("No advertisement found");
      }
    });
  }

  render() {
    if (!this.state.advertisement)
      return (<div>Loading...</div>);

    return (
      <div id="ad-details" className="app">
        <AppHeader />
        <div className="app-body uk-container">
            <Ad key={this.state.advertisement.id} ad={this.state.advertisement}/>
        </div>
      </div>
    );
  }
}
