import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/AdvertisementList';

export default class AdvertisementsPage extends Component {
  render() {
    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>List of advertisements</span></h2>
          <AdList />
        </div>
      </div>
    );
  }
}
