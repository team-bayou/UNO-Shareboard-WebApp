import React, { Component } from 'react';
import AdList from './AdvertisementList';
import Pagination from '../Pagination';

export default class AdvertisementPaginationList extends Component {
  render(){
    let pagination = this.props.pages > 1 ?
      <Pagination pages={this.props.pages} currentPage={this.props.currentPage} resource={this.props.resource}/>
      :
      '';

    return (
      <div>
        <div className="uk-margin-small-bottom">
          {pagination}
        </div>
        <AdList advertisements={this.props.advertisements}/>
        <div className="uk-margin-small-top">
          {pagination}
        </div>
      </div>
    );
  }
}
