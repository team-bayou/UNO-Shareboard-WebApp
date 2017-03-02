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
      <div className="ad-category uk-label" style={{backgroundColor: this.getColor()}}>{typeof this.props.category === 'undefined' ? 'Category' : this.props.category.title}</div>
    );
  }

  getColor(){
    if (typeof this.props.category === 'undefined')
      return '#666666';

    if (this.props.category.title === 'Outdoor')
      return '#804000';
    if (this.props.category.title === 'Books')
      return '#004499';
    if (this.props.category.title === 'Notes')
      return '#ff3300';
    if (this.props.category.title === 'Electronics')
      return '#ffcc00';
    if (this.props.category.title === 'Tools')
      return '#009933';

    return '#666666';
  }
}
