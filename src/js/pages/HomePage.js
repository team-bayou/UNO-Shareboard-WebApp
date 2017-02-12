import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import '../../css/styles.css';

const axios = require('axios');
axios.get('https://uno-shareboard-dev.herokuapp.com/service/v1/stringResponse')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

export default class HomePage extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1 className="uk-heading-divider uk-text-center">UNO-Shareboard</h1>
          <NavBar />
        </div>
        <div className="app-body uk-container">
          <h1>INSERT CONTENT HERE</h1>
        </div>
      </div>
    );
  }
}
