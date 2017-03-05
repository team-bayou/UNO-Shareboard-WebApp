import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import AddAdvertisementForm from '../components/AddAdvertisementForm';

export default class AddAdvertisementPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      categories: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of available categories.
    api.getCategories(function(response){
      if (response){
          self.setState({
            categories: response
          });
      }
      else {
        console.log("No categories found");
      }
    });
  }

  handleSubmit(data){
    // Try to add new advertisement.
    api.addAdvertisement(data, function(response){
      if (response){
        // Get user id from cookie.
        // Redirect to page of user's advertisements.
        browserHistory.push("/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements");
      } else {
        console.log("Failed to create new advertisement.");
      }
    });
  }

  render() {
    if (!this.state.categories)
      return (<div>Loading...</div>);

    var categories = this.state.categories.map(
      category => <option key={category.id} value={category.id}>{category.title}</option>
    );

    return (
      <div id="ad-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>Add advertisement</span></h2>
          <AddAdvertisementForm categories={categories} ownerId={utils.getCookie(constants.COOKIE_A)} handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
