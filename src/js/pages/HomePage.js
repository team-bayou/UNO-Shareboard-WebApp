import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import BuySeekButton from '../components/BuySeekButton'
import SellTradeButton from '../components/SellTradeButton'
import AdvertisementFeed from '../components/AdvertisementFeed'

export default class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of all available advertisements.
    api.getAdvertisements(function(response){
      if (response){
        self.setState({
          advertisements: response
        });
      } else {
        console.log("No advertisements found");
      }
    });
  }

  render() {
    if (!this.state.advertisements)
      return (<div>Loading...</div>);

    return (
      <div id="home" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <div className="uk-flex uk-flex-center">
            <BuySeekButton />
            <SellTradeButton />
          </div>
          <h2 className="uk-heading-line uk-text-center"><span>List of recently added advertisements</span></h2>
          <AdvertisementFeed advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
