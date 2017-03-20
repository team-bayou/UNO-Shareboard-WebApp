import React, { Component } from 'react';
import FindUserResult from './FindUserResult';
import '../../css/styles.css';

const utilities = require('../utility/utilities');

export default class FindUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userid: '',

      userFound: false,
      searchSubmitted: false,
      foundUser: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // We check first if an e-mail or username is being used to search
    if (this.state.email !== "") {
      if (utilities.validateEmail(this.state.email)) {
        utilities.checkForExistingEmail(this.state.email, function(exists, response) {
          if (exists) {
            this.setState({
              userFound: true,
              searchSubmitted: true,
              foundUser: response.data
            });
          }
          else {
            this.setState({
              userFound: false,
              searchSubmitted: true,
              foundUser: null
            });
          }
        }.bind(this));
      }
      else {
        utilities.checkForExistingUsername(this.state.email, function(exists, response) {
          if (exists) {
            this.setState({
              userFound: true,
              searchSubmitted: true,
              foundUser: response.data
            });
          }
          else {
            this.setState({
              userFound: false,
              searchSubmitted: true,
              foundUser: null
            });
          }
        }.bind(this));
      }
    }

    // If not, we check for an ID
    else if (this.state.userid !== "") {
      utilities.getUserByID(this.state.userid, function(exists, response) {
        if (exists) {
          this.setState({
            userFound: true,
            searchSubmitted: true,
            foundUser: response.data
          });
        }
        else {
          this.setState({
            userFound: false,
            searchSubmitted: true,
            foundUser: null
          });
        }
      }.bind(this));
    }

  }

  render() {
    return (
      <div>

        <form className="uk-grid-medium uk-text-center" onSubmit={this.handleSubmit} data-uk-grid>
          <label className="uk-form-label uk-width-1-1"><strong>Note:</strong> Prioritizes e-mail / username over ID</label>
          <div className="uk-width-1-2@m">
            <label className="uk-form-label" htmlFor="email">By E-mail or Username</label>
            <div className="uk-form-controls">
              <input id="email" name="email" className="uk-input" type="text" placeholder="" value={this.state.email} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="uk-width-1-2@m">
            <label className="uk-form-label" htmlFor="userid">By ID</label>
            <div className="uk-form-controls">
              <input id="userid" name="userid" className="uk-input" type="number" placeholder="" value={this.state.userid} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="uk-margin uk-align-center">
            <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Find">Find</button>
          </div>
        </form>

        <div className="uk-panel user-result-container" hidden={!this.state.searchSubmitted}>
          <div className="uk-padding-small uk-text-center" hidden={this.state.userFound}>
            User not found
          </div>
          <div hidden={!this.state.userFound}>
            <FindUserResult user={this.state.foundUser} />
          </div>
        </div>

      </div>
    );
  }
}
