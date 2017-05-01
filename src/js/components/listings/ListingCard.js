import React, { Component } from 'react';
import AdTradeItem from './ListingTradeItem';
import AdHeader from './ListingHeader';
import AdMedia from './ListingMedia';
import AdBody from './ListingBody';
import AdFooter from './ListingFooter';
import EditButton from '../buttons/EditButton';

export default class ListingCard extends Component {
  render() {
    return (
      <div id={"listing-" + this.props.ad.id} className="listing">
        <div className="uk-card uk-card-default uk-card-hover">
          {
            this.props.edit ?
              <div className="uk-card-badge" title="Edit Listing" data-uk-tooltip>
                <EditButton href={"/listings/" + this.props.ad.id + "/edit"} />
              </div>
              :
              ''
          }
          <AdMedia content={this.props.media} adPage={this.props.adPage} />
          <AdTradeItem ad={this.props.ad} adPage={this.props.adPage} />
          <AdHeader ad={this.props.ad} />
          <AdBody content={this.props.body} />
          <AdFooter content={this.props.footer} />
        </div>
      </div>
    );
  }
}
