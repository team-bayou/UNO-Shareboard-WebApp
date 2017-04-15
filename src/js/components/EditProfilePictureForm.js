/* eslint-disable */

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import avatar from '../../media/images/avatar_placeholder.png';

const utils = require('../utility/utilities');
const constants = require('../utility/constants');
const api = require('../utility/api');

export default class EditProfileForm extends Component {

  constructor(props) {
    super(props);

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.state = {
      image: null,
      dropRejected: false,
      updateFailed: false,
      updateSuccess: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onDrop(files) {
    var file = files[0];
    console.log(file);
    this.setState({
      image: file,
      dropRejected: false
    })
  }

  onDropRejected(files) {
    /*
    console.log("Rejected file type");
    this.setState({
      dropRejected: true
    });
    */
    UIkit.notification("Only images allowed", {status:'danger'}) // We can use these now. Let's consider it.
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!!this.state.image) {
      var data = new FormData();
      data.append("description", this.props.user.accountName + "'s Profile Picture");
      data.append("owner", utils.getCookie(constants.COOKIE_A));
      data.append("image_data", this.state.image);

      api.changeUserProfilePicture(data, function(success, response) {
        if (success) {
          this.setState({
            updateSuccess: true,
            updateFailed: false
          });
        }
        else {
          this.setState({
            updateSuccess: false,
            updateFailed: true
          });
        }
      }.bind(this));
    }
  }

  render() {
    return (

      <div className="uk-grid-divider uk-text-center" data-uk-grid>

        <div className="uk-width-1-3@m">
          <span><strong>Current Profile Picture</strong></span><br /><br />
          <img src={!!this.props.image ? constants.HOST + "/service/v1/images/get/" + this.props.image : avatar} alt="Current Profile Picture" width="300" height="300" />
        </div>

        <div className="uk-width-1-3@m">

          <div className="info-list">
            {
              this.state.updateFailed ?
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p>There was a problem changing your profile picture. Please try again or contact us if the problem continues.</p>
              </div>
              : null
            }
            {
              this.state.updateSuccess ?
              <div className="uk-alert-success uk-text-center" data-uk-alert>
                <p>Profile picture updated successfully!</p>
              </div>
              : null
            }

            <Dropzone className="uk-width-1-1 profile-image-dropper" onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple={false} preventDropOnDocument={true} accept={"image/*"}>
              <div className="uk-text-center info-list uk-padding-large">
                Drag and drop or click to select an image to upload
              </div>
            </Dropzone>
            <button className="uk-button uk-button-secondary uk-margin-small-top" type="button" onClick={this.handleSubmit} value="Upload">Upload</button>
          </div>
        </div>

        <div className="uk-width-1-3@m">
          <span><strong>New Picture Preview</strong></span><br /><br />
          {
            !!this.state.image ?
            <img src={this.state.image.preview} alt="New Profile Picture Preview" width="300" height="300" />
            : null
          }
        </div>

      </div>

    );
  }

}
