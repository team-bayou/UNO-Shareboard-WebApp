import React, { Component } from 'react';

const Dropzone = require('react-dropzone');
const constants = require('../utility/constants');
const axios = require('axios');

export default class UploadImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      dropRejected: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);

    const config = {
      auth: {
        username: process.env.REACT_APP_AUTH_USERNAME,
        password: process.env.REACT_APP_AUTH_PASSWORD
      }
    };

    axios.get(constants.HOST + "/service/v1/images/5/info/", config)
    .then(function (response) {
      console.log("success");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("failure");
      console.log(error);
    });
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
    console.log("Rejected file type");
    this.setState({
      dropRejected: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': this.state.image.type
      },
      auth: {
        username: process.env.REACT_APP_AUTH_USERNAME,
        password: process.env.REACT_APP_AUTH_PASSWORD
      }
    };

    var data = new FormData();
    data.append("description", "test description");
    data.append("owner", 1)
    data.append("image_data", this.state.image);

    axios.post(constants.HOST + "/service/v1/images/upload", data, config)
    .then(function (response) {
      console.log("success");
      console.log(response);
    })
    .catch(function (error) {
      console.log("failure");
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {
          this.state.dropRejected ?
          <div className="uk-alert-danger uk-text-center" data-uk-alert>
            <p>You can only attempt to upload images</p>
          </div>
          : null
        }
        <Dropzone onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple={false} preventDropOnDocument={true} accept={"image/*"}>
          <div className="info-list">
            Drag and drop an image here to upload it, or click to select an image
          </div>
        </Dropzone>
        <img src={!!this.state.image ? this.state.image.preview : null} width="128" height="128" alt="preview" />
        <img src={constants.HOST + "/service/v1/images/get/4"} width="128" height="128" alt="preview" />
        <div className="uk-margin" data-uk-margin>
          <button className="uk-button uk-button-default" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
