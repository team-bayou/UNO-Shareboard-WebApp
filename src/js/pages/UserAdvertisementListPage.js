import axios from 'axios';
import constants from '../utility/constants';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/AdvertisementList';

export default class UserAdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of available advertisements.
    axios.get(constants.HOST + '/service/v1/advertisements/users/' + this.props.params.id)
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          self.setState({
            advertisements: response.data
          });
        }
        else {
          console.log("No advertisements found");
        }
      });
  }

  render() {
    if (!this.state.advertisements)
      return (<div>Loading...</div>);

    if (this.state.advertisements.length === 0)
      return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">You do not have any advertisements yet.</h2>
          <a href="/advertisements/add" className="button-success uk-button uk-button-large uk-width-1-1">Create advertisement</a>
        </div>
      </div>
      );

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>List of your personal advertisements</span></h2>
          <a href="/advertisements/add" className="button-success uk-button uk-button-large uk-width-1-1">Create advertisement</a>
          <AdList advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
