import React, { Component } from 'react';

export default class Category extends Component {
  render(){
    return (
      <div className="ad-category">
        <a href={"/advertisements/categories/" + this.props.category.id} className="ad-category uk-label" style={{backgroundColor: this.props.category.color}}>{this.props.category.title}</a>
      </div>
    );
  }
}
