import React, { Component } from 'react';
import '../../css/styles.css';

const api = require('../utility/api');

export default class EditCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    }
  }

  componentDidMount() {
    api.getCategories(function(success, response) {
      this.setState({
        categories: response.data
      });
    }.bind(this));
  }

  render() {
    var cats = "";
    if (this.state.categories) {
      cats = this.state.categories.map(
        cat =>
        <div key={cat.id}>
          <span style={{backgroundColor: cat.color}}>&nbsp;&nbsp;&nbsp;</span>
          <span>{cat.title}</span><br />
        </div>
      );
    }

    return (
      <div>
        {cats}
      </div>
    );
  }
}
