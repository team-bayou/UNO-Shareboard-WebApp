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

          <div className="uk-flex uk-flex-center uk-margin">
            <button className="uk-button uk-button-text uk-button-small" type="button" data-uk-toggle="target: #whatisthis">What are these?</button>
          </div>

          <div className="uk-flex uk-flex-center uk-margin" id="whatisthis" hidden>
            <div className="uk-placeholder uk-background-muted uk-width-auto">
              <dl className="uk-description-list">
                <dd><strong>BUY</strong> - These are listings of items that the submitter is looking to acquire for a certain price</dd>
                <hr />
                <dd><strong>SELL</strong> - These are listings of items that the submitter is offering to sell for a certain price</dd>
              </dl>
            </div>
          </div>

          <hr />

          <AdvertisementFeed advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
