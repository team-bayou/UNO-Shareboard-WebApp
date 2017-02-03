import React, { Component } from 'react';
import logo from '../../media/images/logo.svg';
import '../../css/styles.css';

class NavBar extends Component {
  render(){
    return(
        <nav id="navbar" className="uk-navbar-container" data-uk-navbar data-uk-sticky>
          <div className="uk-navbar-left">
            <img className="uk-navbar-item uk-logo" alt="Logo" src={logo}/>
            <ul className="uk-navbar-nav">
              <li><a href="#">Home</a></li>
              <li>
                <a href="#">First item</a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-active"><a href="#">Sub item 1</a></li>
                    <li><a href="#">Sub item 2</a></li>
                    <li><a href="#">Sub item 3</a></li>
                  </ul>
                </div>
              </li>
              <li><a href="#">Second item</a></li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default NavBar;
