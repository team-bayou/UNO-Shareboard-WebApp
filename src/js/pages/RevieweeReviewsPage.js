import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import ReviewsPage from './ReviewsPage';

export default class RevieweeReviewsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    // If reviews list is yours, just show 'Your'.
    if (this.props.params.id === utils.getCookie(constants.COOKIE_A)) {
      this.setState({
        name: "Your"
      });
    }
    // Otherwise, fetch account name of reviewee.
    else {
      let self = this;

      // Try to get a user.
      api.getUser(this.props.params.id, function(exists, response){
        if (exists && response){
          self.setState({
            name: response.data.accountName + "'s"
          });
        }
        else {
          console.log("No user found");
        }
      });
    }
  }

  render() {
    if (!this.state.name)
      return (<div className="uk-text-center">Loading...</div>);

    var headerText = this.state.name + " received";

    return (
      <ReviewsPage id={this.props.params.id} reviewer={false} headerText={headerText}/>
    );
  }
}
