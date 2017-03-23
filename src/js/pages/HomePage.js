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
    api.getAdvertisements(function(exists, response){
      if (exists && response){
        self.setState({
          advertisements: response.data
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
            <a href="#" className="icon-link" data-uk-toggle="target: #whatisthis; mode: click">
              <span className="uk-icon uk-margin-small-right" href="/home" data-uk-icon="icon: question"></span>
              What are these?
            </a>
          </div>

          <div className="uk-flex uk-flex-center uk-margin" id="whatisthis" hidden>
            <div className="uk-placeholder uk-background-muted uk-width-1-2@m">

              <dl className="uk-description-list">
                <dd><strong>BUY / SEEK</strong><br />These are listings of items that the submitter is looking to acquire by offering to pay a certain price or trade a certain item for</dd>
                <hr />
                <dd><strong>SELL / OFFER</strong><br />These are listings of items that the submitter is offering to sell for a certain price or trade for a certain item</dd>
              </dl>

            </div>
          </div>

          <h2 className="uk-heading-line uk-text-center"><span>{"Recent Listings (" + this.state.advertisements.length + ")"}</span></h2>
          <AdvertisementFeed advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
