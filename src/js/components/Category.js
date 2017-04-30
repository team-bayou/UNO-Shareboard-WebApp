import React, { Component } from 'react';

export default class Category extends Component {
  render() {
    return (
      <div className="listing-category">
        <a href={"/listings/categories/" + this.props.category.id} className="listing-category uk-label" style={{backgroundColor: this.props.category.color}}>{this.props.category.title}</a>
      </div>
    );
  }
}
