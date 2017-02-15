import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import Ad from '../components/Advertisement';

export default class AdvertisementDetailsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      ad: {
          'id': '1',
          'title': 'Literature for UNO class',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'categories': [
            {'id': '1', 'title': 'Books'},
            {'id': '2', 'title': 'Notes'},
          ],
          'owner': {
            'account_name': 'Stevemaster92',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
          'time_published': 'April 01, 2016',
          'trade_item': 'Math II',
      }
    };
  }

  render() {
    return (
      <div id="ad-details-page" className="app">
        <div className="app-header">
          <h1 className="uk-heading-divider uk-text-center">UNO-Shareboard</h1>
          <NavBar />
        </div>
        <div className="app-body uk-container">
            <Ad key={this.state.ad.id} ad={this.state.ad}/>
        </div>
      </div>
    );
  }
}
