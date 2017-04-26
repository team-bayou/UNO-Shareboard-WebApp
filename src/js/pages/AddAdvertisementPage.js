import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import AdForm from '../components/advertisements/AdvertisementForm';
import AppFooter from '../components/AppFooter';

export default class AddAdvertisementPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ad: null,
      categories: []
    };
  }

  componentDidMount() {
    // Try to get a list of available categories.
    api.getCategories(function(exists, response) {
      if (exists && response) {
          this.setState({
            categories: response.data
          });
      } else {
        console.log("No categories found");
      }
    }.bind(this));

    // If user wants to edit his/her advertisement, fetch it by id.
    if (this.props.edit) {
      api.getAdvertisement(this.props.id, function(exists, response) {
        if (exists && response) {
          // Check if the current user is allowed to edit the requested ad, i.e.
          // check if he/she is the owner of that ad.
          if (response.data.owner.id === parseInt(utils.getCookie(constants.COOKIE_A), 10)) {
            this.setState({
              ad: response.data
            });
          } else {
            browserHistory.goBack();
          }
        } else {
          console.log("No listing found");
        }
      }.bind(this));
    }
  }

  render() {
    if (!this.state.categories || (this.props.edit && !this.state.ad))
      return (<div className="uk-text-center">Loading...</div>);

    var categories = this.state.categories.map(
      category => <option key={category.id} value={category.id}>{category.title}</option>
    );

    return (
      <div id="listing-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center">
            <span>{!this.props.edit ? "Create New Listing" : "Edit Listing '" + this.state.ad.title + "'"}</span>
          </h2>
          <AdForm id={this.props.id} ad={this.state.ad} categories={categories}
            ownerId={utils.getCookie(constants.COOKIE_A)} edit={this.props.edit} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
