import React, { Component } from 'react';

import avatar from '../../../media/images/avatar.jpg';

export default class Review extends Component {
  render(){
    var routeToUser = "/users/" + this.props.review.reviewer.id;

    return (
      <div id={"review-" + this.props.review.id} className="review">
        <article className="uk-comment uk-background-muted">
            <header className="uk-comment-header uk-grid-medium uk-flex-middle" data-uk-grid>
                <div className="uk-width-auto">
                    <img className="uk-comment-avatar" src={avatar} width="80" height="80" alt="" />
                </div>
                <div className="uk-width-expand">
                    <h4 className="review-author uk-comment-title uk-margin-remove"><a className="uk-link-reset" href={routeToUser}>{this.props.review.reviewer.account_name}</a></h4>
                    <p className="review-time-published uk-margin-remove">{this.props.review.time_published}</p>
                    <p className="review-rating uk-margin-remove">{this.getRating()}</p>
                </div>
            </header>
            <div className="uk-comment-body">
                <p>{this.props.review.comments}</p>
            </div>
        </article>
      </div>
    );
  }

  getRating(){
    var rating = [];

    for (var i = 0; i < parseInt(this.props.review.rating, 10); i++)
      rating.push(<span key={i} className="uk-icon-button" data-uk-icon="icon: star"></span>);

    return rating;
  }
}
