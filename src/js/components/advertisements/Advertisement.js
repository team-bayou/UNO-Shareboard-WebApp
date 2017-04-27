import React, { Component } from 'react';
import AdCard from './AdvertisementCard';
import AdOwnerDetails from './AdvertisementOwnerDetails';
import Slideshow from '../Slideshow';
import ReportForm from '../ReportForm';

const utils = require('../../utility/utilities');
const constants = require('../../utility/constants');

export default class Advertisement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.ad.imageIDs,
      isAdmin: false
    };
  }

  componentDidMount() {
    utils.verifyAdmin(function(l, a) {
      this.setState({
        isAdmin: a
      });
    }.bind(this));
  }

  render() {
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
          <AdCard ad={this.props.ad} body={body} footer={footer} adPage={true} />

          {
            this.props.ad.owner.id + "" === utils.getCookie(constants.COOKIE_A) + "" || this.state.isAdmin ?
            <div className="uk-width-1-1 uk-margin-small-top uk-text-center">
              <a href={"/advertisements/" + this.props.ad.id + "/edit"} className="listing-link">Edit Listing</a>
            </div>
            : null
          }
          {
            this.props.ad.owner.id + "" !== utils.getCookie(constants.COOKIE_A) + "" ?
            <div className="uk-width-1-1 uk-margin-small-top uk-text-center">
              <a href="#report-listing" className="listing-link" data-uk-toggle>Report Listing</a>
            </div>
            : null
          }

          {
            this.props.ad.owner.id + "" !== utils.getCookie(constants.COOKIE_A) + "" ?
            <div id="report-listing" data-uk-modal="center: true">
              <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title uk-text-center">Report Listing</h2>
                <ReportForm reportedUserID={this.props.ad.owner.id} reportedAdID={this.props.ad.id} />
              </div>
            </div>
            : null
          }

        </div>
      </div>
    );
  }
}
