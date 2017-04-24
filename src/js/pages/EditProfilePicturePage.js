import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import EditProfilePictureForm from '../components/EditProfilePictureForm';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

export default class EditProfilePicturePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null,
      imageID: null
    };
  }

  componentDidMount() {
    api.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
      if (exists) {
        this.setState({
          loading: false,
          user: response.data,
          imageID: response.data.imageId
        });
      }
    }.bind(this));
  }

  render() {
    if (this.state.loading) {
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
              <h2 className="uk-heading-line uk-text-center"><span>Change Profile Picture</span></h2>
            </div>

            <div className="uk-child-width-1-1" data-uk-grid>
              <EditProfilePictureForm user={this.state.user} image={this.state.imageID} />
            </div>

          </div>
        </div>
      );
    }
  }

}
