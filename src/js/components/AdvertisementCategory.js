import React, { Component } from 'react';

export default class AdvertisementCategory extends Component {
  constructor(){
    super();
    this.state = {
      color: '#004499',
    };
  }

  render(){
    this.setAttributes(this.props.category);

    return (
      <div className="ad-category uk-label" style={{backgroundColor: this.state.color}}>{this.props.category.name}</div>
    );
  }

  setAttributes(category){
    let color;

    if (category.name === 'Outdoor')
      color = '#804000';
    else if (category.name === 'Books')
      color = '#004499';
    else if (category.name === 'Notes')
      color = '#ff3300';
    else if (category.name === 'Electronics')
      color = '#ffcc00';
    else if (category.name === 'Tools')
      color = '#009933';

    this.state.color = color;
  }
}
