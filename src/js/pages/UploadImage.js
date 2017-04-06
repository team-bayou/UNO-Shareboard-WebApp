import React, { Component } from 'react';

const Dropzone = require('react-dropzone');
const constants = require('../utility/constants');
const axios = require('axios');

export default class UploadImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.files[0]);
    this.setState({
      image: event.target.files[0]
    });
  }

  onDrop(files) {
    var file = files[0];
    console.log(file);
    this.setState({
      image: file
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': "text/html"//this.state.image.type
      },
      auth: {
        username: process.env.REACT_APP_AUTH_USERNAME,
        password: process.env.REACT_APP_AUTH_PASSWORD
      }
    };

    axios.get(constants.HOST + "/service/v1/images/5", config)
    .then(function (response) {
      console.log("success");
      console.log(response);
      this.setState({
        imageData: window.btoa(response.data)
      })
    }.bind(this))
    .catch(function (error) {
      console.log("failure");
      console.log(error);
    });

    /*
    var data = new FormData();
    data.append("description", "test description");
    data.append("owner", 12)
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
    */
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} size={150}>
          <div className="info-list">
            Drag and drop an image here to upload it, or click to select an image
          </div>
        </Dropzone>
        <img src={!!this.state.image ? this.state.image.preview : null} width="128" height="128" alt="preview" />
        <img src={constants.HOST + "/service/v1/images/5"} width="128" height="128" alt="preview" />
        <div className="uk-margin" data-uk-margin>
          <button className="uk-button uk-button-default" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}
