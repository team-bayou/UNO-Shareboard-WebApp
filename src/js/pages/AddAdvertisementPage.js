import constants from '../utility/constants';
import utils from '../utility/utilities';
import api from '../utility/api';

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppHeader from '../components/AppHeader';

export default class AddAdvertisementPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      categories: [],
      title: '',
      description: '',
      category: '',
      owner: utils.getCookie(constants.COOKIE_A),
      timePublished: '',
      expirationDate: '',
      adType: '',
      price: '',
      tradeItem: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of available categories.
    api.getCategories(function(response){
      if (response){
          self.setState({
            categories: response
          });
      }
      else {
        console.log("No categories found");
      }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();

    // Try to add new advertisement.
    api.addAdvertisement(this.state, function(response){
      if (response){
        // Get user id from cookie.
        // Redirect to page of user's advertisements.
        browserHistory.push("/users/" + utils.getCookie(constants.COOKIE_A) + "/advertisements");
      } else {
        console.log("Failed to create new advertisement.");
      }
    });
  }

  render() {
    if (!this.state.categories)
      return (<div>Loading...</div>);

    var categories = this.state.categories.map(
      category => <option key={category.id} value={category.id}>{category.title}</option>
    );

    return (
      <div id="ad-add" className="app">
        <AppHeader />
        <div className="app-body uk-container">
          <h2 className="uk-heading-line uk-text-center"><span>Add advertisement</span></h2>
          <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
            <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="ad-title">Title</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="ad-title" type="text" placeholder="Some title..." name="title" onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="ad-description">Description</label>
                  <div className="uk-form-controls">
                    <textarea className="uk-textarea" id="ad-description" placeholder="Some description..." name="description" onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="ad-categories">Select</label>
                  <div className="uk-form-controls">
                    <select className="uk-select" id="ad-categories" name="category" defaultValue="-1" onChange={this.handleInputChange}>
                      <option disabled value="-1"> -- Select a category -- </option>
                      {categories}
                    </select>
                  </div>
                </div>
              </div>
              <div className="uk-margin">
                <div className="uk-margin uk-grid-small uk-child-width-auto" data-uk-grid>
                  <div>
                  <label className="uk-form-label" htmlFor="ad-time-published">Time published</label>
                    <div className="uk-form-controls">
                      <input className="uk-input" id="ad-time-published" type="date" name="timePublished" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                  <div>
                    <label className="uk-form-label" htmlFor="ad-expiration-date">Expiration date</label>
                    <div className="uk-form-controls">
                      <input className="uk-input" id="ad-expiration-date" type="date" name="expirationDate" onChange={this.handleInputChange}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-margin">
                <div className="uk-form-label">Advertisement type</div>
                <div className="ad-type uk-form-controls">
                  <label><input className="uk-radio" type="radio" name="adType" value="offer" onChange={this.handleInputChange}/> Offer</label><br/>
                  <label><input className="uk-radio" type="radio" name="adType" value="seek" onChange={this.handleInputChange}/> Seek</label>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="ad-price">Price</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="ad-price" type="number" step="0.01" placeholder="Some price ($)..." name="price" onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="ad-trade-item">Trade item</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="ad-trade-item" type="text" placeholder="Some trade item..." name="tradeItem" onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="uk-margin-large-top">
                  <button className="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-align-center submit-btn" type="submit" value="Submit">Submit</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
