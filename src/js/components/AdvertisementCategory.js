import React, { Component } from 'react';

export default class AdvertisementCategory extends Component {
  constructor(){
    super();
    this.state = {
      color: '#004499',
    };
  }

  render(){
    return (
      <div className="ad-category uk-label" style={{backgroundColor: this.getColor()}}>{this.props.category.name}</div>
    );
  }

  getColor(){
    if (this.props.category.name === 'Outdoor')
      return '#804000';
    if (this.props.category.name === 'Books')
      return '#004499';
    if (this.props.category.name === 'Notes')
      return '#ff3300';
    if (this.props.category.name === 'Electronics')
      return '#ffcc00';
    if (this.props.category.name === 'Tools')
      return '#009933';

    return '#666666';
  }
}
