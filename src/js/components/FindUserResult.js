import React, { Component } from 'react';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const api = require('../utility/api');

export default class FindUserResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      editEmail: '',
      editUsername: '',
      editFirstName: '',
      editLastName: '',
      editPhoneNumber: '',
      editUserType: '',
      editFacebookID: '',
      editTwitterID: '',
      editShowEmail: '',
      editShowName: '',
      editShowPhone: '',

      userSuccessfullyUpdated: false,
      userUpdateFailed: false
    };

    this.errorMsg = "";

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.performDelete = this.performDelete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.user !== newProps.user) {
      this.setState({
        id: newProps.user.id,
        editEmail: newProps.user.email || "",
        editUsername: newProps.user.accountName || "",
        editFirstName: newProps.user.firstName || "",
        editLastName: newProps.user.lastName || "",
        editPhoneNumber: newProps.user.phoneNumber || "",
        editUserType: newProps.user.userType || "",
        editFacebookID: newProps.user.facebookId || "",
        editTwitterID: newProps.user.twitterHandle || "",
        editShowEmail: newProps.user.showEmail ? "show" : "hide" || "",
        editShowName: newProps.user.showFullName ? "show" : "hide" || "",
        editShowPhone: newProps.user.showPhoneNumber ? "show" : "hide" || "",

        userSuccessfullyUpdated: false,
        userUpdateFailed: false
      });
    }
  }

  performDelete(event) {
    event.preventDefault();

    api.deleteUser(this.state.id, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        this.errorMsg = "There was a problem deleting the user";
        this.setState({
          userUpdateFailed: true
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

    this.setState({
      userUpdateFailed: false,
      userSuccessfullyUpdated: false
    });

    if (!!this.state.editEmail &&
        !!this.state.editUsername &&
        !!this.state.editUserType) {

      this.refs.adminedituserbtn.setAttribute("disabled", "disabled");

      var userData = {
        "id": this.state.id,
        "accountName": this.state.editUsername,
        "userType": this.state.editUserType,
        "firstName": this.state.editFirstName,
        "lastName": this.state.editLastName,
        "email": this.state.editEmail,
        "phoneNumber": this.state.editPhoneNumber,
        "facebookId": this.state.editFacebookID,
        "twitterHandle": this.state.editTwitterID,
        "showEmail": this.state.editShowEmail === "show" ? true : false,
        "showFullName": this.state.editShowName === "show" ? true : false,
        "showPhoneNumber": this.state.editShowPhone === "show" ? true : false
      };

      utils.checkForExistingEmail(userData.email, function(exists, response) {
        if (exists && response.data.id !== userData.id) {
          this.errorMsg = "That e-mail address is in use by another user";
          this.setState({
            userUpdateFailed: true,
            userSuccessfullyUpdated: false
          });
          this.refs.adminedituserbtn.removeAttribute("disabled");
        }
        else {
          utils.checkForExistingUsername(userData.accountName, function(exists, response) {
            if (exists && response.data.id !== userData.id) {
              this.errorMsg = "That username is in use by another user";
              this.setState({
                userUpdateFailed: true,
                userSuccessfullyUpdated: false
              });
              this.refs.adminedituserbtn.removeAttribute("disabled");
            }
            else {
              api.updateUser(userData, function(success, response) {
                if (success) {
                  this.setState({
                    userSuccessfullyUpdated: true,
                    userUpdateFailed: false
                  });
                  this.refs.adminedituserbtn.removeAttribute("disabled");
                }
                else {
                  this.errorMsg = "There was a problem updating the user";
                  this.setState({
                    userUpdateFailed: true,
                    userSuccessfullyUpdated: false
                  });
                  this.refs.adminedituserbtn.removeAttribute("disabled");
                }
              }.bind(this));
            }
          }.bind(this));
        }
      }.bind(this));
    }
  }

  render() {

    if (!this.props.user) {
      return (
        <span></span>
      );
    }

    else {
      return (
        <div className="uk-overflow-auto">
          {
            this.state.userUpdateFailed ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> {this.errorMsg}</p>
            </div>
            : null
          }
          {
            this.state.userSuccessfullyUpdated ?
            <div className="uk-alert-success uk-text-center" data-uk-alert>
              <p>User successfully updated</p>
            </div>
            : null
          }
          <table className="uk-table uk-table-small uk-table-middle user-result-table">
            <tbody>
              <tr>
                <td colSpan="2">
                  <a href={"/users/" + this.state.id} className="user-result-icon-profile" data-uk-icon="icon: user; ratio: 1.15" title="View Profile" data-uk-tooltip></a>
                  <a href="#confirm-delete-user" className="user-result-icon-delete float-right" data-uk-icon="icon: close; ratio: 1.25" data-uk-toggle title="Delete User" data-uk-tooltip></a>
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">ID</td>
                <td className="user-result-content uk-width-2-3">{this.state.id}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">E-mail</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editEmail" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editEmail} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">E-mail Visible</td>
                <td className="user-result-content uk-width-2-3">
                  <select name="editShowEmail" className="uk-select uk-form-blank admin-edit-field" value={this.state.editShowEmail} onChange={this.handleInputChange}>
                    <option value="show">show</option>
                    <option value="hide">hide</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Username</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editUsername" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editUsername} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">First Name</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editFirstName" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editFirstName} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Last Name</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editLastName" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editLastName} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Name Visible</td>
                <td className="user-result-content uk-width-2-3">
                  <select name="editShowName" className="uk-select uk-form-blank admin-edit-field" value={this.state.editShowName} onChange={this.handleInputChange}>
                    <option value="show">show</option>
                    <option value="hide">hide</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Phone Number</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editPhoneNumber" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editPhoneNumber} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Phone Visible</td>
                <td className="user-result-content uk-width-2-3">
                  <select name="editShowPhone" className="uk-select uk-form-blank admin-edit-field" value={this.state.editShowPhone} onChange={this.handleInputChange}>
                    <option value="show">show</option>
                    <option value="hide">hide</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">User Type</td>
                <td className="user-result-content uk-width-2-3">
                  <select name="editUserType" className="uk-select uk-form-blank admin-edit-field" value={this.state.editUserType} onChange={this.handleInputChange}>
                    <option value="admin">admin</option>
                    <option value="standard">standard</option>
                  </select>
                </td>
              </tr>
              {
              /*
              <tr>
                <td className="user-result-title uk-width-1-3">Facebook ID</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editFacebookID" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editFacebookID} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Twitter ID</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editTwitterID" className="uk-input uk-form-blank admin-edit-field" type="text" value={this.state.editTwitterID} onChange={this.handleInputChange} />
                </td>
              </tr>
              */
              }
              <tr>
                <td colSpan="2">
                  <button ref="adminedituserbtn" className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="button" value="Save Changes" onClick={this.handleSubmit}>Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="confirm-delete-user" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body uk-text-center">
              <p>Are you sure you want to delete this user?<br />This cannot be undone.</p>
              <p className="uk-text-right">
                <button className="uk-button uk-button-secondary uk-modal-close" type="button" onClick={this.performDelete}>Yes</button>
                <button className="uk-button uk-button-default uk-modal-close" type="button">No</button>
              </p>
            </div>
          </div>

        </div>
      );
    }

  }
}
