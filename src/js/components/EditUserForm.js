import React, { Component } from 'react';
import '../../css/styles.css';

const utilities = require('../utility/utilities');

export default class EditUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUserID: '',
      editEmail: '',
      editUsername: '',
      editFirstName: '',
      editLastName: '',
      editPhoneNumber: '',
      editUserType: '',
      editFacebookID: '',
      editTwitterID: ''
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
  }

  render() {
    return (
      <form className="uk-form-horizontal" onSubmit={this.handleSubmit} data-uk-grid>

        <div className="uk-margin-remove">
          <label className="uk-form-label" htmlFor="editUserID">ID</label>
          <div className="uk-form-controls">
            <input id="editUserID" name="editUserID" className="uk-input" type="number" value={this.state.editUserID} onChange={this.handleInputChange} />
          </div>
        </div>

        <div>
          <label className="uk-form-label" htmlFor="editEmail">E-mail</label>
          <div className="uk-form-controls">
            <input id="editEmail" name="editEmail" className="uk-input" type="text" value={this.state.editEmail} onChange={this.handleInputChange} />
          </div>
        </div>

        <div className="uk-width-1-1 uk-text-right">
          <button className="uk-button uk-button-secondary" type="submit" value="Save">Save</button>
          <button className="uk-button uk-button-default uk-modal-close" type="button">Close</button>
        </div>

      </form>
    );
  }
}
