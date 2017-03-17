import utils from '../utility/utilities';

import React, { Component } from 'react';
import AdCategory from './AdvertisementCategory';
import AdTradeItem from './AdvertisementTradeItem';
import AdHeader from './AdvertisementHeader';
import AdOwnerDetails from './AdvertisementOwnerDetails';
import Slideshow from './Slideshow';

import img1 from '../../media/images/light.jpg';
import img2 from '../../media/images/avatar.jpg';

export default class Advertisement extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [
        {
          imageId: 1,
          imageData: img1
        },
        {
          imageId: 2,
          imageData: img2
        },
        {
          imageId: 3,
          imageData: img1
        },
        {
          imageId: 4,
          imageData: img2
        }
      ]
    };
  }

  render(){
    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="ad-images uk-card-media-top uk-text-center">
              <Slideshow images={this.state.images}/>
          </div>
          <AdTradeItem ad={this.props.ad} />
          <AdHeader ad={this.props.ad} />
          <div className="ad-description uk-card-body">
            <p>{this.props.ad.description}</p>
          </div>
          <div className="uk-card-footer">
            <AdOwnerDetails owner={this.props.ad.owner} />
          </div>
        </div>
      </div>
    );
  }
}
