import React, { Component } from 'react';
import Star from './Star';

export default class Rating extends Component {
  constructor(props) {
    super(props);

    this.ratingTips = ["Very bad", "Bad", "Okay", "Good", "Very good"];

    this.state = {
      stars: this.props.rating ? this.getRating(this.props.rating - 1) : this.getRating(-1),
      selected: false,
      selectedRating: -1
    };
  }

  handleMouseHover(index, enter) {
    let stars;

    if (enter) {
      stars = this.getRating(index);
    } else if (this.state.selected) {
      stars = this.getRating(this.state.selectedRating);
    } else if (!this.state.selected) {
      stars = this.getRating(-1);
    }

    this.setState({
      stars: stars
    });
  }

  handleRatingClick(index) {
    this.setState({
      selected: true,
      selectedRating: index
    });

    this.props.onClick(index + 1);
  }

  getRating(index) {
    let stars = [];

    for (var i = 0; i < 5; i++) {
      stars.push(
        <a key={i} name="rating" value={i} className="uk-display-inline-block" title={this.ratingTips[i]}
          data-uk-tooltip="pos: bottom;" onClick={this.handleRatingClick.bind(this, i)}
          onMouseEnter={this.handleMouseHover.bind(this, i, true)} onMouseLeave={this.handleMouseHover.bind(this, i, false)}>
          <Star key={i} id={i} full={i <= index ? true : false}/>
        </a>
      );
    }

    return stars;
  }

  render() {
    return (
      <div className="review-rating">
        {this.state.stars}
      </div>
    );
  }
}
