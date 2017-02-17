import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import ReviewList from '../components/ReviewList';

export default class ReviewsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviews: [
        {
          'id': '1',
          'rating': '5',
          'comments': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'time_published': 'April 01, 2016',
          'reviewer': {
            'id': '1',
            'account_name': 'Parker',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
          'reviewee': {
            'id': '2',
            'account_name': 'Stevemaster92',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
        },
        {
          'id': '2',
          'rating': '3',
          'comments': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'time_published': 'April 01, 2016',
          'reviewer': {
            'id': '4',
            'account_name': 'Joshua',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
          'reviewee': {
            'id': '2',
            'account_name': 'Stevemaster92',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
        },
        {
          'id': '3',
          'rating': '5',
          'comments': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'time_published': 'April 01, 2016',
          'reviewer': {
            'id': '4',
            'account_name': 'Joshua',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
          'reviewee': {
            'id': '2',
            'account_name': 'Stevemaster92',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
        },
        {
          'id': '4',
          'rating': '5',
          'comments': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
          'time_published': 'April 01, 2016',
          'reviewer': {
            'id': '3',
            'account_name': 'Rachel',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
          'reviewee': {
            'id': '2',
            'account_name': 'Stevemaster92',
            'email': 'shaselwa@uno.edu',
            'phone_number': '+1 504 123 4567',
            'facebook_id': '100000121504447',
            'twitter_handle': 's_steini',
            'reviews': '42',
          },
        },
      ],
    };
  }

  render() {
    return (
      <div id="reviews-page" className="app">
        <div className="app-header">
          <h1 className="uk-heading-divider uk-text-center">UNO-Shareboard</h1>
          <NavBar />
        </div>
        <div className="app-body uk-container">
            <h1>Reviews of {this.state.reviews[0].reviewee.account_name}</h1>
            <ReviewList reviews={this.state.reviews}/>
        </div>
      </div>
    );
  }
}
