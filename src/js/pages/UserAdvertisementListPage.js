import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/AdvertisementList';
import CreateButton from '../components/CreateButton';

export default class UserAdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of user's advertisements.
    api.getUserAdvertisements(this.props.params.id, function(exists, response){
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
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{"Your Current Listings (" + this.state.advertisements.length + ")"}</span></h2>
          <div className="uk-width-1-4 uk-align-center uk-margin-large-bottom">
            <CreateButton href={"/advertisements/add"} name={"Create advertisement"} />
          </div>
          <AdList advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
