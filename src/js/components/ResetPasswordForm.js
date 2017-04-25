import React, { Component } from 'react';
import '../../css/styles.css';

const encryption = require('../utility/encryption');
const utilities = require('../utility/utilities');
const validateEmail = utilities.validateEmail;

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    let pageNeedsLoading = true;
    this.propsValid = true;

    if (!props.email || !validateEmail(props.email)) {
      this.propsValid = false;
      pageNeedsLoading = false;
    }

    this.emptyFields = false;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.passwordValid = true;
    this.passwordMatch = true;
    this.verificationCorrect = true;

    this.state = {
      password: '',
      passwordConfirm: '',
      verifycode: '',

      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid,
      verifycodeStyle: this.inputValid,

      pageLoaded: !pageNeedsLoading,
      resetComplete: false,
      errorWithReset: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    utilities.checkForExistingEmail(this.props.email, function (exists) {
      if (exists) {
        utilities.checkForPasswordResetVerifyCode(this.props.email, function(exists, response) {
          this.propsValid = exists;
          this.setState({
            pageLoaded: true
          });
        }.bind(this));
      }
      else {
        this.propsValid = false;
        this.setState({
          pageLoaded: true
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
    this.resetErrors();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.resetpassbtn.setAttribute("disabled", "disabled");

      if (this.state.password.length < 6) {
        this.passwordValid = false;
        this.setState({
          passwordStyle: this.inputInvalid
        });
        this.refs.resetpassbtn.removeAttribute("disabled");
      }
      else if (this.state.password !== this.state.passwordConfirm) {
        this.passwordMatch = false;
        this.setState({
          passwordConfirmStyle: this.inputInvalid
        });
        this.refs.resetpassbtn.removeAttribute("disabled");
      }
      else {
        const hashedPassword = encryption.createHash(this.state.password);
        const data = {
          email: this.props.email,
          enteredVerificationCode: this.state.verifycode,
          enteredPasswordHash: hashedPassword.hash,
          enteredPasswordSalt: hashedPassword.salt
        };
        utilities.performPasswordReset(data, function(verifyCodeCorrect, error) {
          if (verifyCodeCorrect) {
            this.setState({
              resetComplete: true
            });
          }
          else if (!error) {
            this.verificationCorrect = false;
            this.setState({
              verifycodeStyle: this.inputInvalid
            });
            this.refs.resetpassbtn.removeAttribute("disabled");
          }
          else {
            this.setState({
              errorWithReset: true
            });
            this.refs.resetpassbtn.removeAttribute("disabled");
          }
        }.bind(this));
      }
    }
  }

  resetErrors() {
    this.passwordValid = true;
    this.passwordMatch = true;
    this.verificationCorrect = true;
    this.emptyFields = false;
    this.setState({
      passwordStyle: this.inputValid,
      passwordConfirmStyle: this.inputValid,
      verifycodeStyle: this.inputValid,
      errorWithReset: false
    });
  }

  checkForEmptyFields() {
    if (this.state.verifycode === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      this.emptyFields = true;

      const ps = this.state.password === "" || this.state.password.length < 6 ? this.inputInvalid : this.inputValid;
      const pcs = this.state.passwordConfirm === "" || this.state.password !== this.state.passwordConfirm ? this.inputInvalid : this.inputValid;
      const vcs = this.state.verifycode === "" ? this.inputInvalid : this.inputValid;
      this.setState({
        passwordStyle: ps,
        passwordConfirmStyle: pcs,
        verifycodeStyle: vcs
      });
    }
    else {
      this.emptyFields = false;
    }
  }

  render() {

    if (!this.state.pageLoaded) {
      return (
        <div className="uk-text-center">
          <p>Loading...</p>
        </div>
      );
    }

    else {

      if (this.state.resetComplete) {
        return (
          <div className="uk-text-center">
            <h2 className="uk-heading-line uk-text-center"><span>Password Updated</span></h2>
            <p>Your password has been updated.</p>
            <p>You may now <a href="/">login</a> with your new password.</p>
          </div>
        );
      }

      else {

        if (!this.propsValid) {
          return (
            <div className="uk-text-center">
              <h2 className="uk-heading-line uk-text-center"><span>Error</span></h2>
              <p>The link that you clicked seems to be invalid.</p>
              <p>Please try the link again, or contact us if you continue having problems.</p>
            </div>
          );
        }

        else {
          return (
            <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
              <fieldset className="uk-fieldset">

                <legend className="uk-legend uk-text-center">Reset Password</legend>

                {
                  this.emptyFields ?
                  <div className="uk-alert-danger uk-text-center" data-uk-alert>
                    <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
                  </div>
                  : null
                }
                {
                  this.state.errorWithReset ?
                  <div className="uk-alert-danger uk-text-center" data-uk-alert>
                    <p><span data-uk-icon="icon: warning"></span> There was an error when attempting to reset your password<br />Please try again or contact us if the problem persists</p>
                  </div>
                  : null
                }

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="verifycode">Verification Code <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input id="verifycode" name="verifycode" className={this.state.verifycodeStyle} type="text" placeholder="Verification Code" value={this.state.verifycode} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.verificationCorrect}>Verification code is incorrect</label>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="password">New Password <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input id="password" name="password" className={this.state.passwordStyle} type="password" placeholder="New Password" value={this.state.password} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.passwordValid}>Password is too short (minimum 6 characters)</label>
                </div>

                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="passwordConfirm">Confirm New Password <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input id="passwordConfirm" name="passwordConfirm" className={this.state.passwordConfirmStyle} type="password" placeholder="Confirm New Password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
                  </div>
                  <label className="uk-form-label label-invalid" hidden={this.passwordMatch}>Passwords don't match</label>
                </div>

                <div className="uk-margin">
                  <button ref="resetpassbtn" className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Complete Registration">Set Password</button>
                </div>

              </fieldset>
            </form>
          );
        }
      }
    }
  }

}
