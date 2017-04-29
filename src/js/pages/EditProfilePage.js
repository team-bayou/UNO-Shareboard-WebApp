import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import EditProfileForm from '../components/EditProfileForm';
import LoadingNotification from '../components/LoadingNotification';

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
        <LoadingNotification />
      );
    }

    else {
      return (
        <div id="edit-profile">
          <AppHeader />
          <div className="app-body uk-container uk-text-break">

            <div className="uk-margin-medium-bottom">
              <h2 className="uk-heading-line uk-text-center" id="editprofileheader"><span>Edit Profile</span></h2>
            </div>

            <div className="uk-child-width-1-2@m" data-uk-grid>
              <EditProfileForm user={this.state.user} />
            </div>

          </div>
          <AppFooter />
        </div>
      );
    }
  }

}
