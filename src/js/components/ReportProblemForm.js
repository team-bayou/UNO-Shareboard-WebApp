import React, { Component } from 'react';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const constants = require('../utility/constants');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.emptyFields = false;
    this.emailValid = true;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.textareaValid = "uk-textarea";
    this.textareaInvalid = "uk-textarea uk-form-danger";

    this.state = {
      loaded: false,

      name: "",
      email: "",
      description: "",

      emailStyle: this.inputValid,
      descriptionStyle: this.textareaValid
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
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.resetErrors();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      if (!utils.validateEmail(this.state.email)) {
        this.emailValid = false;
        this.setState({
          emailStyle: this.inputInvalid
        });
      }
      else {
        console.log(this.state.description);
      }
    }
  }

  resetErrors() {
    this.emptyFields = false;
    this.emailValid = true;

    this.setState({
      emailStyle: this.inputValid,
      descriptionStyle: this.textareaValid
    });
  }

  checkForEmptyFields() {
    if (this.state.email === "" || this.state.description === "") {
      this.emptyFields = true;

      const es = this.state.email === "" ? this.inputInvalid : this.inputValid;
      const ds = this.state.description === "" ? this.textareaInvalid : this.textareaValid;
      this.setState({
        emailStyle: es,
        descriptionStyle: ds
      });
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="name">Your Name</label>
              <div className="uk-form-controls">
                <input name="name" id="name" className="uk-input" type="text" placeholder="Your Name" value={this.state.name} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="email">Your E-mail <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <input name="email" id="email" className={this.state.emailStyle} type="text" placeholder="Your E-mail" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <label className="uk-form-label label-invalid" hidden={this.emailValid}>Please make sure your e-mail is valid</label>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="description">Description of your problem <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <textarea name="description" id="description" className={this.state.descriptionStyle} rows="5" placeholder="Description of your problem" onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Submit">Submit</button>
            </div>

            <div className="uk-margin-top uk-text-center">
              <a href="/">Home</a>
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
