import React, { Component } from 'react';
import AdCard from './AdvertisementCard';
import AdOwnerDetails from './AdvertisementOwnerDetails';
import Slideshow from '../Slideshow';

import img1 from '../../../media/images/light.jpg';
import img2 from '../../../media/images/avatar.jpg';

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
    var body = (<p>{this.props.ad.description}</p>);
    var footer = (
      <AdOwnerDetails ad={this.props.ad} owner={this.props.ad.owner} reviews={this.props.reviews}/>
    );

    return (
      <div className="uk-grid-large uk-grid-divider" data-uk-grid>
        <div className="uk-width-1-2@m">
          <Slideshow images={this.state.images}/>
        </div>
        <div className="uk-width-1-2@m">
          <AdCard ad={this.props.ad} body={body} footer={footer} />
        </div>
      </div>
    );
  }
}
