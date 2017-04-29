import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';
import AdForm from '../components/advertisements/AdvertisementForm';
import AppFooter from '../components/AppFooter';
import LoadingNotification from '../components/LoadingNotification';

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
        var sorted = response.data.sort(function(a,b) {
          if (a.title < b.title)
            return -1;
          if (a.title > b.title)
            return 1;
          return 0;
        });
        this.setState({
          categories: sorted
        });
      }
    }.bind(this));

    // If user wants to edit his/her advertisement, fetch it by id.
    if (this.props.edit) {
      api.getAdvertisement(this.props.id, function(exists, response) {
        if (exists && response) {
          let ad = response.data;
          // Check if the current user is allowed to edit the requested ad, i.e.
          // check if he/she is the owner of that ad.
          if (response.data.owner.id === parseInt(utils.getCookie(constants.COOKIE_A), 10)) {
            this.setState({
              ad: ad
            });
          }
          else {
            utils.verifyAdmin(function(loggedIn, admin) {
              if (admin) {
                this.setState({
                  ad: ad
                });
              }
              else {
                browserHistory.goBack();
              }
            }.bind(this));
          }
        } else {
          browserHistory.push("/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements");
        }
      }.bind(this));
    }
  }

  render() {
    if (!this.state.categories || (this.props.edit && !this.state.ad))
      return (<LoadingNotification />);

    var categories = this.state.categories.map(
      category => <option key={category.id} value={category.id}>{category.title}</option>
    );

    return (
      <div id="listing-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center" id="addlistingheader">
            <span>{!this.props.edit ? "Create New Listing" : "Edit Listing '" + this.state.ad.title + "'"}</span>
          </h2>
          <AdForm id={this.props.id}
            ad={this.state.ad}
            categories={categories}
            ownerId={this.state.ad ? this.state.ad.ownerId : null}
            edit={this.props.edit} />
        </div>
        <AppFooter />
      </div>
    );
  }
}
