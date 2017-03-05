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
      title: '',
      description: '',
      category: '',
      owner: utils.getCookie(constants.COOKIE_A),
      timePublished: '',
      expirationDate: '',
      adType: '',
      price: '',
      tradeItem: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();

    // Try to add new advertisement.
    api.addAdvertisement(this.state, function(response){
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
          <AddAdvertisementForm categories={categories} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
