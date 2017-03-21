import React, { Component } from 'react';
import '../../css/styles.css';

export default class FindUserResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentWillReceiveProps(newProps) {
    if (this.props.user !== newProps.user) {
      this.setState({
        editEmail: newProps.user.email,
        editUsername: newProps.user.accountName,
        editFirstName: newProps.user.firstName,
        editLastName: newProps.user.lastName,
        editPhoneNumber: newProps.user.phoneNumber,
        editUserType: newProps.user.userType,
        editFacebookID: newProps.user.facebookId,
        editTwitterID: newProps.user.twitterHandle
      });
    }
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

    if (this.state.editEmail !== "" && this.state.editUsername !== "" && this.state.editUserType !== "") {
      console.log("user edited");
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

          <table className="uk-table uk-table-small uk-table-middle user-result-table">
            <tbody>
              <tr>
                <td colSpan="2" className="uk-text-center">
                  <a className="uk-link-reset" href={"/users/" + this.props.user.id}>View Profile</a>
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">ID</td>
                <td className="user-result-content uk-width-2-3">{this.props.user.id}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">E-mail</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editEmail" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.email} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Username</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editUsername" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.accountName} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">First Name</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editFirstName" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.firstName} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Last Name</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editLastName" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.lastName} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Phone Number</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editPhoneNumber" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.phoneNumber} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">User Type</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editUserType" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.userType} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Facebook ID</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editFacebookID" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.facebookId} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-3">Twitter ID</td>
                <td className="user-result-content uk-width-2-3">
                  <input name="editTwitterID" className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={this.props.user.twitterHandle} onChange={this.handleInputChange} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="button" value="Save Changes" onClick={this.handleSubmit}>Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      );
    }

  }
}
