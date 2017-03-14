import React, { Component } from 'react';

export default class AdvertisementCategory extends Component {
  render(){
    return (
      <a href={"/advertisements/categories/" + this.props.category.id} className="ad-category uk-label" style={{backgroundColor: this.props.category.color}}>{this.props.category.title}</a>
    );
  }
}
