import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import FindUserForm from '../components/FindUserForm';
import EditCategories from '../components/EditCategories';

export default class AdminPage extends Component {
  render() {
    return (
      <div id="admin" className="app">
        <AppHeader />
        <div className="app-body uk-container">

          <div className="uk-margin-medium-bottom">
            <h2 className="uk-heading-line uk-text-center"><span>Administration</span></h2>
          </div>

          <div className="uk-grid-divider" data-uk-grid>
            <div className="uk-width-2-5@m">
              <h3 className="uk-heading uk-text-center"><span>Find User</span></h3>
              <FindUserForm />
            </div>
            <div className="uk-width-3-5@m">
              <h3 className="uk-heading uk-text-center"><span>Ad Categories</span></h3>
              <EditCategories />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
