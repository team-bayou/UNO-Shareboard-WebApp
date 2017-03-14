import api from '../utility/api';

import React, { Component } from 'react';
import AppHeader from '../components/AppHeader';
import AdList from '../components/AdvertisementList';

export default class CategoryAdvertisementsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      category: "",
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of category's advertisements.
    api.getCategoryAdvertisements(this.props.params.id, function(exists, response){
      if (exists && response){
        self.setState({
          category: response.data[0].category.title,
          advertisements: response.data
        });
      } else {
        console.log("No advertisements found");
      }
    });
  }

  render() {
    if (!this.state.advertisements)
      return (<div className="uk-text-center">Loading...</div>);

    return (
      <div id="ad-list" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>{"Current Listings of category \"" + this.state.category + "\""}</span></h2>
          <AdList advertisements={this.state.advertisements}/>
        </div>
      </div>
    );
  }
}
