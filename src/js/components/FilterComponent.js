import React, { Component } from 'react';

const api = require('../utility/api');

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      searchTerm: '',
      description: false,
      category: 'cat--1'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api.getCategories(function(success, response) {
      var sorted = response.data.sort(function(a,b) {
        if (a.title < b.title)
          return -1;
        if (a.title > b.title)
          return 1;
        return 0;
      });
      if (success) {
        this.setState({
          categories: sorted
        });
      }
    }.bind(this));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.searchTerm.length > 0) {
      let data = {
        page: 1,
        searchTerm: this.state.searchTerm,
        adType: this.props.adType
      };

      const catID = this.state.category.slice(4);
      if (catID !== "-1")
        data.catID = catID;

      if (this.state.description)
        data.description = this.state.searchTerm;

      api.search(data, function(success, response) {
        console.log(response);
      });
    }
  }

  render() {
    var cats = this.state.categories.map(
      cat => <option key={cat.id} name={"cat-" + cat.id} value={"cat-" + cat.id}>{cat.title}</option>
    );

    return(
      <form className="uk-grid-small uk-width-2-3@m center" onSubmit={this.handleSubmit} data-uk-grid>
        <div className="uk-width-1-5@m">
          <select className="uk-select" name="category" value={this.state.category} onChange={this.handleInputChange}>
            <option value="cat--1">--Categories--</option>
            {cats}
          </select>
        </div>
        <div className="uk-width-3-5@m">
          <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon" data-uk-icon="icon: search"></span>
            <input className="uk-input" name="searchTerm" type="text" placeholder="search..." value={this.state.searchTerm} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="uk-width-1-5@m">
          <button className="uk-button uk-button-primary uk-width-1-1">Search</button>
        </div>

        <div className="uk-margin center">
          <label><input className="uk-checkbox" type="checkbox" name="description" checked={this.state.description} onChange={this.handleInputChange} /> Also search listing descriptions?</label>
        </div>
      </form>
    );
  }
}
