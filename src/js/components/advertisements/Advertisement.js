import React, { Component } from 'react';
import AdCard from './AdvertisementCard';
import AdOwnerDetails from './AdvertisementOwnerDetails';
import Slideshow from '../Slideshow';

export default class Advertisement extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: this.props.ad.imageIDs
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
