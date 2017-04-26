import React, { Component } from 'react';

export default class Paginator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginator: this.initPaginator()
    }
  }

  render() {
    return(
      <div className="pagination">
        <ul className="uk-pagination uk-flex-center" data-uk-margin>
          {this.state.paginator}
        </ul>
      </div>
    );
  }

  initPaginator() {
    let pages = [];
    let routeToPage = "/" + this.props.resource + "/page/";
    let routeToPrevious = routeToPage + (this.props.currentPage - 1);
    let routeToNext = routeToPage + (this.props.currentPage + 1);

    // Add 'Previous' to paginator.
    if (this.props.currentPage > 1) {
      pages.push(<li key={-1}><a href={routeToPrevious}><span data-uk-icon="icon: chevron-left"></span> Previous</a></li>);
    }

    for (var i = 1; i <= this.props.pages; i++) {
      if (i === this.props.currentPage) {
        pages.push(<li key={i} className="uk-active"><span>{i}</span></li>);
      } else {
        pages.push(<li key={i}><a href={routeToPage + i}>{i}</a></li>);
      }
    }

    // Add 'Next' to paginator.
    if (this.props.currentPage < this.props.pages) {
      pages.push(<li key={0}><a href={routeToNext}>Next <span data-uk-icon="icon: chevron-right"></span></a></li>);
    }

    return pages;
  }
}
