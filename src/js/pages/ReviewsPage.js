import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
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
      <div id="reviews" className="app">
        <AppHeader />
        <div className="app-body uk-container">
            <h2 className="uk-heading-line uk-text-center"><span>Reviews of {this.state.reviews[0].reviewee.account_name}</span></h2>
            <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}
