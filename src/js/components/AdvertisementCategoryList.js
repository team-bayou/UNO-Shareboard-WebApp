import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';

class AdvertisementCategoryList extends Component {
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

export default AdvertisementCategoryList;
