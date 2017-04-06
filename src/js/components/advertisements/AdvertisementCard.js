import React, { Component } from 'react';
import AdTradeItem from './AdvertisementTradeItem';
import AdHeader from './AdvertisementHeader';
import AdMedia from './AdvertisementMedia';
import AdBody from './AdvertisementBody';
import AdFooter from './AdvertisementFooter';
import EditButton from '../buttons/EditButton';

export default class AdvertisementCard extends Component {
  render(){
    return (
      <div id={"ad-" + this.props.ad.id} className="ad">
        <div className="uk-card uk-card-default uk-card-hover">
          {
            this.props.edit ?
              <div className="uk-card-badge">
                <EditButton href={"/advertisements/" + this.props.ad.id + "/edit"} />
              </div>
              :
              ''
          }
          <AdMedia content={this.props.media} />
          <AdTradeItem ad={this.props.ad} />
          <AdHeader ad={this.props.ad} />
          <AdBody content={this.props.body} />
          <AdFooter content={this.props.footer} />
        </div>
      </div>
    );
  }
}
