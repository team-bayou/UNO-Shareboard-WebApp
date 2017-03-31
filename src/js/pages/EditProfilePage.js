import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import EditProfileForm from '../components/EditProfileForm';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

export default class EditProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    api.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
      if (exists) {
        this.setState({
          user: response.data
        });
      }
    }.bind(this));
  }

  render() {
    if (!this.state.user) {
      return (
        <div className="uk-text-center">Loading...</div>
      );
    }

    else {
      return (
        <div id="edit-profile">
          <AppHeader />
          <div className="app-body uk-container uk-text-break">

            <div className="uk-margin-medium-bottom">
              <h2 className="uk-heading-line uk-text-center"><span>Edit Profile</span></h2>
            </div>

            <div className="uk-child-width-1-2@m" data-uk-grid>
              <EditProfileForm user={this.state.user} />
            </div>

          </div>
        </div>
      );
    }
  }

}
