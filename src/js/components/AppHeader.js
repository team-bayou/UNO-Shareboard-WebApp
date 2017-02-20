import React, { Component } from 'react';
import NavBar from './NavBar';

export default class AppHeader extends Component {
  render(){
    return (
      <div className="app-header">
        <h1 className="uk-heading-divider uk-text-center">UNO-Shareboard</h1>
        <NavBar />
      </div>
    );
  }
}
