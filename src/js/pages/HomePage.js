import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import BuySeekButton from '../components/BuySeekButton';
import SellOfferButton from '../components/SellOfferButton';
import CreateButton from '../components/CreateButton';
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
            <div className="uk-width-1-5 uk-margin-small-left uk-margin-small-right">
              <BuySeekButton />
            </div>
            <div className="uk-width-1-5 uk-margin-small-left uk-margin-small-right">
              <SellOfferButton />
            </div>
            <div className="uk-margin-small-left">
              <CreateButton href={"/advertisements/add"} name={"Create advertisement"} />
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

              {/*}
              <div className="uk-grid-match uk-child-width-1-2@m" data-uk-grid>
                <div>
                  <p><strong>BUY / SEEK</strong><br />These are listings of items that the submitter is looking to acquire by offering to pay a certain price or trade a certain item for</p>
                </div>
                <div>
                  <p><strong>SELL / OFFER</strong><br />These are listings of items that the submitter is offering to sell for a certain price or trade for a certain item</p>
                </div>
              </div>
              {*/}

              <dl className="uk-description-list">
                <dd><strong>BUY / SEEK</strong><br />These are listings of items that the submitter is looking to acquire by offering to pay a certain price or trade a certain item for</dd>
                <hr />
                <dd><strong>SELL / OFFER</strong><br />These are listings of items that the submitter is offering to sell for a certain price or trade for a certain item</dd>
                <hr />
                <dd><strong>CREATE ADVERTISEMENT</strong><br />Create a new advertisement with all necessary information on demand</dd>
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
