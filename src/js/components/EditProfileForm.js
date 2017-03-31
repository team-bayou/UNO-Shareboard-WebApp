import React, { Component } from 'react';

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
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",

      updateFailed: false,
      updateSuccess: false
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

      if (!!this.state.newPassword) {
        if (this.state.newPassword.length < 6) {
          this.passwordValid = false;
          this.noErrors = false;
          this.setState({
            newPasswordStyle: this.inputInvalid
          });
        }
        else if (this.state.newPassword !== this.state.newPasswordConfirm) {
          this.passwordsMatch = false;
          this.noErrors = false;
          this.setState({
            newPasswordConfirmStyle: this.inputInvalid
          });
        }
      }

      if (this.noErrors) {
        if (this.state.accountName.length < 4) {
          this.usernameTooShort = true;
          this.noErrors = false;
          this.setState({
            accountNameStyle: this.inputInvalid
          });
        }
        else {
          utils.checkForExistingUsername(this.state.accountName, function(exists, response) {
            if (exists && response.data.id + "" !== utils.getCookie(constants.COOKIE_A) + "") {
              this.usernameTaken = true;
              this.noErrors = false;
              this.setState({
                accountNameStyle: this.inputInvalid
              });
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
      phoneNumber: this.state.phone
    };

    let passChanged = false;

    if (!!this.state.newPassword && !!this.state.newPasswordConfirm) {
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
            this.setState({
              updateSuccess: true
            });
          }.bind(this));
        }
        else {
          this.setState({
            updateSuccess: true
          });
        }
      }
      else {
        this.setState({
          updateFailed: true
        });
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
      updateFailed: false,
      updateSuccess: false
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
    }
  }

  render() {
    return (
      <form className="uk-form-stacked uk-align-center" onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset">

          <label className="uk-form-label label-invalid" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>
          <div className="uk-alert-danger uk-text-center" data-uk-alert hidden={!this.state.updateFailed}>
            <a className="uk-alert-close" data-uk-close data-uk-icon="icon: close"></a>
            <p>There was a problem updating your account. Please try again or contact us if the problem continues.</p>
          </div>
          <div className="uk-alert-success uk-text-center" data-uk-alert hidden={!this.state.updateSuccess}>
            <a className="uk-alert-close" data-uk-close data-uk-icon="icon: close"></a>
            <p>Account updated successfully!</p>
          </div>

          <div className="uk-margin">
            <div className="uk-placeholder uk-padding-small uk-background-muted">
              <label className="uk-form-label">
                <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: info"></span>
                To make any changes to your account, you must provide your current password.
              </label>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="currentPassword">Current Password</label>
            <div className="uk-form-controls">
              <input name="currentPassword" className={this.state.currentPasswordStyle} type="password" placeholder="Current Password" value={this.state.currentPassword} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.currentPasswordCorrect}>Password Incorrect</label>
          </div>

          <hr className="uk-divider-icon" />

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="accountName">Username</label>
            <div className="uk-form-controls">
              <input name="accountName" className={this.state.accountNameStyle} type="text" placeholder="Username" value={this.state.accountName} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={!this.usernameTaken}>That username has already been taken</label>
            <label className="uk-form-label label-invalid" hidden={!this.usernameTooShort}>Username is too short (minimum 3 characters)</label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="firstName">First Name</label>
            <div className="uk-form-controls">
              <input name="firstName" className={this.inputValid} type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange} />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="lastName">Last Name</label>
            <div className="uk-form-controls">
              <input name="lastName" className={this.inputValid} type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange} />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="phone">Phone Number</label>
            <div className="uk-form-controls">
              <input name="phone" className={this.inputValid} type="text" placeholder="Phone Number" value={this.state.phone} onChange={this.handleInputChange} />
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
              <input name="newPassword" className={this.state.newPasswordStyle} type="password" placeholder="New Password" value={this.state.newPassword} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordValid}>Password is too short (minimum 6 characters)</label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label form-label" htmlFor="newPasswordConfirm">Confirm New Password</label>
            <div className="uk-form-controls">
              <input name="newPasswordConfirm" className={this.state.newPasswordConfirmStyle} type="password" placeholder="Confirm New Password" value={this.state.newPasswordConfirm} onChange={this.handleInputChange} />
            </div>
            <label className="uk-form-label label-invalid" hidden={this.passwordsMatch}>Passwords don't match</label>
          </div>

          <div className="uk-margin">
            <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Save Changes">Save Changes</button>
          </div>

        </fieldset>
      </form>
    );
  }

}
