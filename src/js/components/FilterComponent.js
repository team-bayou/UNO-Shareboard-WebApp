import React, { Component } from 'react';

const api = require('../utility/api');

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      searchTerm: ''
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
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    var cats = this.state.categories.map(
      cat => <option key={cat.id} name={"cat-" + cat.id} value={cat.title}>{cat.title}</option>
    );

    return(
      <form className="uk-grid-small uk-width-2-3@m center" onSubmit={this.handleSubmit} data-uk-grid>
        <div className="uk-width-1-5@m">
          <select className="uk-select">
            <option>--Categories--</option>
            {cats}
          </select>
        </div>
        <div className="uk-width-3-5@m">
          <div className="uk-inline uk-width-1-1">
            <span className="uk-form-icon" data-uk-icon="icon: search"></span>
            <input className="uk-input" name="searchTerm" type="text" placeholder="search..." />
          </div>
        </div>
        <div className="uk-width-1-5@m">
          <button className="uk-button uk-button-primary uk-width-1-1">Search</button>
        </div>
      </form>
    );
  }
}
