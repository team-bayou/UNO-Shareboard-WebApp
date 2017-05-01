import React, { Component } from 'react';
import NavBar from './NavBar';

export default class AppHeader extends Component {
  render() {
    return (
      <div className="app-header">
        <h1 className="uk-heading uk-text-center"><a href="/home" className="header-link">UNO Shareboard</a></h1>
        <NavBar />
      </div>
    );
  }
}
