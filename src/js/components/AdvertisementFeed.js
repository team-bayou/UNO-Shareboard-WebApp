import React, { Component } from 'react';
import AdList from '../components/AdvertisementList';

export default class AdvertisementFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      ads: [
        {
          'id': '1',
          'title': 'Literature for UNO class',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'categories': [
            {'id': '1', 'title': 'Books'},
            {'id': '2', 'title': 'Notes'},
          ],
          'owner': 'Stefan',
          'time_published': 'April 01, 2016',
          'trade_item': 'Math II',
        },
        {
          'id': '2',
          'title': 'Outdoor clothes',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'categories': [
            {'id': '1', 'title': 'Outdoor'},
          ],
          'owner': 'Parker',
          'time_published': 'September 23, 2014',
          'price': '$ 150.00',
        },
        {
          'id': '3',
          'title': 'Different kinds of tools',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'categories': [
            {'id': '1', 'title': 'Tools'},
          ],
          'owner': 'Rachel',
          'time_published': 'January 31, 2017',
          'price': '$ 375.95',
        },
        {
          'id': '4',
          'title': 'Different kinds of tools',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'categories': [
            {'id': '1', 'title': 'Tools'},
          ],
          'owner': 'Rachel',
          'time_published': 'January 31, 2017',
        },
      ],
    };
  }

  render() {
    return (
        <div className="uk-container-small uk-align-center">
            <AdList advertisements={this.state.ads}/>
        </div>
    );
  }
}
