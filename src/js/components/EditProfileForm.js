import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

const utils = require('../utility/utilities');
const constants = require('../utility/constants');
const api = require('../utility/api');
const encryption = require('../utility/encryption');

export default class EditProfileForm extends Component {

  constructor(props) {
    super(props);

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.currentPasswordCorrect = true;
    this.usernameTaken = false;
    this.usernameTooShort = false;
    this.emptyFields = false;
    this.passwordValid = true;
    this.passwordsMatch = true;
    this.noErrors = true;

    this.state = {
      accountNameStyle: this.inputValid,
      currentPasswordStyle: this.inputValid,
      newPasswordStyle: this.inputValid,
      newPasswordConfirmStyle: this.inputValid,

      accountName: this.props.user.accountName,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phone: this.props.user.phoneNumber,
      showFullName: this.props.user.showFullName,
      showEmail: this.props.user.showEmail,
      showPhoneNumber: this.props.user.showPhoneNumber,
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",

      updateFailed: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForEmptyFields = this.checkForEmptyFields.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
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
      this.refs.editprofilebtn.setAttribute("disabled", "disabled");

      if (!!this.state.newPassword) {
        if (this.state.newPassword.length < 6) {
          this.passwordValid = false;
          this.noErrors = false;
          this.setState({
            newPasswordStyle: this.inputInvalid
          });
          this.refs.editprofilebtn.removeAttribute("disabled");
        }
        else if (this.state.newPassword !== this.state.newPasswordConfirm) {
          this.passwordsMatch = false;
          this.noErrors = false;
          this.setState({
            newPasswordConfirmStyle: this.inputInvalid
          });
          this.refs.editprofilebtn.removeAttribute("disabled");
        }
      }

      if (this.noErrors) {
        if (this.state.accountName.length < 4) {
          this.usernameTooShort = true;
          this.noErrors = false;
          this.setState({
            accountNameStyle: this.inputInvalid
          });
          this.refs.editprofilebtn.removeAttribute("disabled");
          $('html, body').animate({ scrollTop: $("#editprofileheader").offset().top - 15 }, 'fast');
        }
        else {
          utils.checkForExistingUsername(this.state.accountName, function(exists, response) {
            if (exists && response.data.id + "" !== utils.getCookie(constants.COOKIE_A) + "") {
              this.usernameTaken = true;
              this.noErrors = false;
              this.setState({
                accountNameStyle: this.inputInvalid
              });
              this.refs.editprofilebtn.removeAttribute("disabled");
              $('html, body').animate({ scrollTop: $("#editprofileheader").offset().top - 15 }, 'fast');
            }
            else {
              utils.getUserByID(utils.getCookie(constants.COOKIE_A), function(exists, response) {
                if (exists) {
                  const currentHash = encryption.createHash(this.state.currentPassword, response.data.passwordSalt).hash;
                  api.attemptLogin(response.data.accountName, currentHash, "accountName", function(success) {
                    if (success) {
                      this.commitChanges();
                    }
                    else {
                      this.currentPasswordCorrect = false;
                      this.setState({
                        currentPasswordStyle: this.inputInvalid
                      });
                      this.refs.editprofilebtn.removeAttribute("disabled");
                      $('html, body').animate({ scrollTop: $("#editprofileheader").offset().top - 15 }, 'fast');
                    }
                  }.bind(this));
                }
              }.bind(this));
            }
          }.bind(this));
        }
      }
    }

  }

  commitChanges() {
    let data = {
      id: utils.getCookie(constants.COOKIE_A),
      accountName: this.state.accountName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phone,
      showFullName: this.state.showFullName,
      showEmail: this.state.showEmail,
      showPhoneNumber: this.state.showPhoneNumber
    };

    let passChanged = false;

    if (!!this.state.newPassword) {
      let pass = encryption.createHash(this.state.newPassword);
      data.passwordSalt = pass.salt;
      data.passwordHash = pass.hash;
      passChanged = true;
    }

    api.updateUser(data, function(success, response) {
      if (success) {
        if (passChanged) {
          utils.clearCookies();
          utils.bakeCookies(data.accountName, function() {
            browserHistory.push("/profile");
          });
        }
        else {
          browserHistory.push("/profile");
        }
      }
      else {
        this.setState({
          updateFailed: true
        });
        this.refs.editprofilebtn.removeAttribute("disabled");
        $('html, body').animate({ scrollTop: $("#editprofileheader").offset().top - 15 }, 'fast');
      }
    }.bind(this));
  }

  resetErrors() {
    this.currentPasswordCorrect = true;
    this.usernameTaken = false;
    this.usernameTooShort = false;
    this.emptyFields = false;
    this.passwordValid = true;
    this.passwordsMatch = true;
    this.noErrors = true;

    this.setState({
      accountNameStyle: this.inputValid,
      currentPasswordStyle: this.inputValid,
      newPasswordStyle: this.inputValid,
      newPasswordConfirmStyle: this.inputValid,
      updateFailed: false
    });
  }

  checkForEmptyFields() {
    if (!this.state.accountName || !this.state.currentPassword) {
      this.emptyFields = true;
      this.noErrors = false;
      this.setState({
        accountNameStyle: !!this.state.accountName ? this.inputValid : this.inputInvalid,
        currentPasswordStyle: !!this.state.currentPassword ? this.inputValid : this.inputInvalid
      });
      $('html, body').animate({ scrollTop: $("#editprofileheader").offset().top - 15 }, 'fast');
    }
  }

  render() {
    return (
      <form className="uk-form-stacked uk-align-center" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">

          {
            this.emptyFields ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
            </div>
            : null
          }
          {
            this.state.updateFailed ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> There was a problem updating your account. Please try again or contact us if the problem continues.</p>
            </div>
            : null
          }

          <div className="uk-margin">
            <div className="uk-placeholder uk-padding-small uk-background-muted">
              <label className="uk-form-label">
                <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: info"></span>
                To make any changes to your account, you must provide your current password.
              </label>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="currentPassword">Current Password <span className="label-invalid">*</span></label>
            <div className="uk-form-controls">
              <input name="currentPassword" className={this.state.currentPasswordStyle} type="password"
                placeholder="Current Password" value={this.state.currentPassword} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.currentPasswordCorrect}>Password Incorrect</label>
          </div>

          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="accountName">Username <span className="label-invalid">*</span></label>
            <div className="uk-form-controls">
              <input id="accountName" name="accountName" className={this.state.accountNameStyle} type="text"
                placeholder="Username" value={this.state.accountName} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={!this.usernameTaken}>That username has already been taken</label>
            <label className="uk-form-label label-invalid" hidden={!this.usernameTooShort}>Username is too short (minimum 3 characters)</label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="firstName">First Name</label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-1">
                <input id="firstName" name="firstName" className={this.inputValid} type="text"
                  placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange} />
              </div>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="lastName">Last Name</label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-1">
                <input id="lastName" name="lastName" className={this.inputValid} type="text"
                  placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange} />
              </div>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="phone">Phone Number</label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-1">
                <input id="phone" name="phone" className={this.inputValid} type="text" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} />
              </div>
            </div>
          </div>

          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <div className="uk-placeholder uk-padding-small uk-background-muted">
              <label className="uk-form-label">
                <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: info"></span>
                Show or hide your contact information to other users.
              </label>
            </div>
          </div>

          <div className="uk-grid-small" data-uk-grid>
            <div>
              <div className="uk-form-label form-label">Show/Hide First & Last Name?</div>
              <div className="uk-form-label form-label">Show/Hide Email Address?</div>
              <div className="uk-form-label form-label">Show/Hide Phone Number?</div>
            </div>

            <div>
              <div className="uk-form-controls">
                <div className="uk-grid-small" data-uk-grid>
                  <label>
                    <input className="uk-radio" type="radio" name="showFullName"
                      value="true" onChange={this.handleInputChange}
                      defaultChecked={this.state.showFullName}/> Show
                  </label>
                  <label>
                    <input className="uk-radio" type="radio" name="showFullName"
                      value="false" onChange={this.handleInputChange}
                      defaultChecked={!this.state.showFullName}/> Hide
                  </label>
                </div>
              </div>
              <div className="uk-form-controls">
                <div className="uk-grid-small" data-uk-grid>
                  <label>
                    <input className="uk-radio" type="radio" name="showEmail"
                      value="true" onChange={this.handleInputChange}
                      defaultChecked={this.state.showEmail}/> Show
                  </label>
                  <label>
                    <input className="uk-radio" type="radio" name="showEmail"
                      value="false" onChange={this.handleInputChange}
                      defaultChecked={!this.state.showEmail}/> Hide
                  </label>
                </div>
              </div>
              <div className="uk-form-controls">
                <div className="uk-grid-small" data-uk-grid>
                  <label>
                    <input className="uk-radio" type="radio" name="showPhoneNumber"
                      value="true" onChange={this.handleInputChange}
                      defaultChecked={this.state.showPhoneNumber}/> Show
                  </label>
                  <label>
                    <input className="uk-radio" type="radio" name="showPhoneNumber"
                      value="false" onChange={this.handleInputChange}
                      defaultChecked={!this.state.showPhoneNumber}/> Hide
                  </label>
                </div>
              </div>
            </div>
          </div>

          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <div className="uk-placeholder uk-padding-small uk-background-muted">
              <label className="uk-form-label">
                <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: info"></span>
                Only fill in below if you want to change your password.
              </label>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="newPassword">New Password</label>
            <div className="uk-form-controls">
              <input id="newPassword" name="newPassword" className={this.state.newPasswordStyle} type="password" placeholder="New Password" value={this.state.newPassword} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordValid}>Password is too short (minimum 6 characters)</label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="newPasswordConfirm">Confirm New Password</label>
            <div className="uk-form-controls">
              <input id="newPasswordConfirm" name="newPasswordConfirm" className={this.state.newPasswordConfirmStyle} type="password" placeholder="Confirm New Password" value={this.state.newPasswordConfirm} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordsMatch}>Passwords don't match</label>
          </div>

          <div className="uk-margin uk-text-center">
            <button ref="editprofilebtn" className="uk-button uk-button-secondary" type="submit" value="Save Changes">Save Changes</button>
          </div>

        </fieldset>
      </form>
    );
  }

}
