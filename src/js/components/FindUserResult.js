import React, { Component } from 'react';
import EditUserForm from './EditUserForm';
import '../../css/styles.css';

export default class FindUserResult extends Component {
  render() {

    if (!this.props.user) {
      return (
        <span></span>
      );
    }

    else {
      return (
        <div className="uk-overflow-auto">

          <div className="user-result-subnav uk-text-center">
            <a href={"/users/" + this.props.user.id}>View Profile</a> / <a href="#edit-user" data-uk-toggle>Edit User</a>
          </div>

          <table className="uk-table uk-table-small uk-table-expand user-result-table">
            <tbody>
              <tr>
                <td className="user-result-title user-result-first uk-width-1-2">ID</td>
                <td className="user-result-content user-result-first uk-width-1-2">{this.props.user.id}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">E-mail</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.email}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">Username</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.accountName}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">First Name</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.firstName}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">Last Name</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.lastName}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">Phone Number</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.phoneNumber}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">User Type</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.userType}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">Facebook ID</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.facebookId}</td>
              </tr>
              <tr>
                <td className="user-result-title uk-width-1-2">Twitter ID</td>
                <td className="user-result-content uk-width-1-2">{this.props.user.twitterHandle}</td>
              </tr>
            </tbody>
          </table>

          <div id="edit-user" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body">
              <EditUserForm user={this.props.user} />
            </div>
          </div>

        </div>
      );
    }

  }
}
