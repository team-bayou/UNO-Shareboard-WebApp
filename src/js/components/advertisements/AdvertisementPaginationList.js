import React, { Component } from 'react';
import AdList from './AdvertisementList';
import Paginator from '../Paginator';

export default class AdvertisementPaginationList extends Component {
  render() {
    let paginator = this.props.pages > 1 ?
      <Paginator pages={this.props.pages} currentPage={this.props.currentPage} resource={this.props.resource}/>
      :
      '';

    return (
      <div>
        <div className="uk-margin-small-bottom">
          {paginator}
        </div>
        <AdList advertisements={this.props.advertisements} edit={this.props.edit}/>
        <div className="uk-margin-medium-top">
          {paginator}
        </div>
      </div>
    );
  }
}
