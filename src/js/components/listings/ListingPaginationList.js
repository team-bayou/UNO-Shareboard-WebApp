import React, { Component } from 'react';
import AdList from './ListingList';
import Paginator from '../Paginator';

export default class ListingPaginationList extends Component {
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
        <AdList listings={this.props.listings} edit={this.props.edit}/>
        <div className="uk-margin-medium-top">
          {paginator}
        </div>
      </div>
    );
  }
}
