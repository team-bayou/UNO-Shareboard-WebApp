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

    this.errorMsg = "";

    this.state = {
      image: null,
      dropRejected: false,
      updateFailed: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this);
  }

  onDrop(files) {
    var file = files[0];
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
    //UIkit.notification("Only images allowed", {status:'danger'}) // We can use these now. Let's consider it.
  }

  deleteProfilePicture() {
    this.setState({
      updateFailed: false
    });

    api.removeUserProfilePicture(utils.getCookie(constants.COOKIE_A), function(success, response) {
      if (success) {
        api.deleteImage(this.props.image, function(success, response) {
          window.location.reload();
        });
      }
      else {
        this.errorMsg = "There was a problem deleting your profile picture. Please try again or contact us if the problem continues.";
        this.setState({
          updateFailed: true
        });
      }
    }.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      updateFailed: false
    });

    if (!!this.state.image) {
      var data = new FormData();
      data.append("description", this.props.user.accountName + "'s Profile Picture");
      data.append("owner", utils.getCookie(constants.COOKIE_A));
      data.append("image_data", this.state.image);

      api.changeUserProfilePicture(data, function(success, response) {
        if (success) {
          if (!!this.props.image) {
            api.deleteImage(this.props.image, function(success, response) {
              window.location.reload();
            });
          }
          else {
            window.location.reload();
          }
        }
        else {
          this.errorMsg = "There was a problem changing your profile picture. Please try again or contact us if the problem continues.";
          this.setState({
            updateFailed: true
          });
        }
      }.bind(this));
    }
  }

  render() {
    return (

      <div>
        {
          this.state.updateFailed ?
          <div className="uk-text-center" data-uk-grid>
            <div className="uk-width-1-1 uk-alert-danger uk-text-center" data-uk-alert>
              <p>{this.errorMsg}</p>
            </div>
          </div>
          : null
        }

        <div className="uk-grid-divider uk-text-center" data-uk-grid>

          <div className="uk-width-1-3@m">
            <span><strong>Current Profile Picture</strong></span><br /><br />
            <img src={!!this.props.image ? constants.HOST + "/service/v1/images/get/" + this.props.image : avatar} alt="Current Profile Picture" width="300" height="300" className="uk-margin-small-bottom" /><br />
            {
              !!this.props.image ?
              <a className="uk-button uk-button-secondary uk-margin-small-top" href="#delete-image" data-uk-toggle><span data-uk-icon="icon: close"></span> Delete</a>
              : null
            }
          </div>

          <div className="uk-width-1-3@m">
            <div className="info-list">
              <Dropzone className="uk-width-1-1 profile-image-dropper" onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple={false} preventDropOnDocument={true} accept={"image/*"}>
                <div className="uk-text-center info-list uk-padding-large">
                  <span data-uk-icon="icon: cloud-upload"></span><br/>
                  Drag and drop or click to select an image to upload
                </div>
              </Dropzone>
              <button className="uk-button uk-button-secondary uk-margin-small-top" type="button" onClick={this.handleSubmit} value="Upload"><span data-uk-icon="icon: upload"></span> Upload</button>
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

        <div id="delete-image" data-uk-modal="center: true">
          <div className="uk-modal-dialog uk-modal-body uk-text-center">
            <h2 className="uk-modal-title">Delete Profile Picture</h2>
            <p>Are you sure you want to delete your profile picture?</p>
            <p className="uk-text-right">
              <button className="uk-button uk-button-secondary" type="button" value="Yes" onClick={this.deleteProfilePicture}>Yes</button>
              <button className="uk-button uk-button-default uk-modal-close" type="button" value="No">No</button>
            </p>
          </div>
        </div>
      </div>

    );
  }

}
