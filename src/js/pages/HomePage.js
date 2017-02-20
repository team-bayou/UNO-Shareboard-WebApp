import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import BuySeekButton from '../components/BuySeekButton'
import SellTradeButton from '../components/SellTradeButton'
import AdvertisementFeed from '../components/AdvertisementFeed'
import '../../css/styles.css';

export default class HomePage extends Component {
  render() {
    return (
      <div id="home" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <div className="uk-flex uk-flex-center">
            <BuySeekButton />
            <SellTradeButton />
          </div>
          <AdvertisementFeed />
        </div>
      </div>
    );
  }
}
