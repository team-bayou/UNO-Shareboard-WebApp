import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';

export default class AdvertisementCategoryList extends Component {
  render(){
    var categories = this.props.categories.map(
      category => <AdCategory key={category.key} category={category}/>
    );

    return (
      <div className="ad-category-list">
        {categories}
      </div>
    );
  }
}
