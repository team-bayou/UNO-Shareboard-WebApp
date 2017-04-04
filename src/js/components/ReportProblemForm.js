import React, { Component } from 'react';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const constants = require('../utility/constants');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      user: null,

      name: "",
      email: "",
      description: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    utils.verifyLoggedIn(utils.getCookie(constants.COOKIE_A), function(loggedIn) {
      if (loggedIn) {
        utils.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
          if (exists) {
            this.setState({
              name: response.data.firstName + " " + response.data.lastName,
              email: response.data.email
            });
          }
          this.setState({
            loaded: true
          });
        }.bind(this));
      }
      else {
        this.setState({
          loaded: true
        });
      }
    }.bind(this));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (this.state.loaded) {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="name">Your Name</label>
              <div className="uk-form-controls">
                <input name="name" id="name" className="uk-input" type="text" placeholder="Your Name" value={this.state.name} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="email">Your E-mail *</label>
              <div className="uk-form-controls">
                <input name="email" id="email" className="uk-input" type="text" placeholder="Your E-mail" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={true}>Please make sure your e-mail is filled out and valid</label>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="description">Description of your problem *</label>
              <div className="uk-form-controls">
                <textarea name="description" id="description" className="uk-textarea" rows="5" placeholder="Description of your problem" onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={true}>Please provide a description of your problem</label>
            </div>

            <div className="uk-margin">
              <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Submit">Submit</button>
            </div>

            <div className="uk-margin-top uk-text-center">
              <a href="/">Back</a>
            </div>

          </fieldset>
        </form>
      );
    }

    else {
      return (<div className="uk-text-center">Loading...</div>);
    }
  }
}
