import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';

const utils = require('../utility/utilities');
const api = require('../utility/api');
const constants = require('../utility/constants');

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    api.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
      this.setState({
        user: response.data
      });
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
        <div id="home" className="app">
          <AppHeader />
          <div className="app-body uk-container">

            <div className="uk-margin-medium-bottom">
              <h2 className="uk-heading-line uk-text-center"><span>Profile</span></h2>
            </div>

            <div data-uk-grid>
              <div className="uk-width-1-1 uk-text-break">
                {JSON.stringify(this.state.user)}
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}
