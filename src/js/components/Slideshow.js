import React, { Component } from 'react';

import no_image from '../../media/images/no_image.png';

const constants = require('../utility/constants');

export default class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: this.createSlides(),
      dots: this.createDotNav(),
      slideIndex: 1
    };
  }

  componentDidMount() {
    this.showSlides(this.state.slideIndex);
  }

  createSlides() {
    if (this.props.images.length < 1) {
      return (
        <div className="slide fade">
          <img src={no_image} alt="" />
        </div>
      );
    }
    else {
      return (
        this.props.images.map((img, index) =>
          <div key={index} className="slide fade">
            <img src={constants.HOST + "/service/v1/images/get/" + img} alt=""/>
          </div>
        )
      );
    }
  }

  createDotNav() {
    if (this.props.images.length < 1) {
      return (
        null
      );
    }
    else {
      return (
        this.props.images.map((img, index) =>
          <li key={index} className="dot">
            <a onClick={() => this.currentSlide(index + 1)}></a>
          </li>
        )
      );
    }
  }

  plusSlides(n) {
    let slideIndex = this.state.slideIndex + n;

    this.setState({
      slideIndex: slideIndex
    });

    this.showSlides(slideIndex);
  }

  currentSlide(n) {
    this.setState({
      slideIndex: n
    });

    this.showSlides(n);
  }

  showSlides(n) {
    let slideIndex = n;
    let slides = this.slides.children;
    let dots = this.dots.children;

    if (n > slides.length) {
      slideIndex = 1;

      this.setState({
        slideIndex: 1
      });
    }

    if (n < 1) {
      slideIndex = slides.length;

      this.setState({
        slideIndex: slides.length
      });
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" uk-active", "");
    }

    if (slides.length > 1) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " uk-active";
    }
    else {
      slides[0].style.display = "block";
    }
  }

  render() {
    return(
      <div className="slideshow uk-visible-toggle">
        <div className="slideshow-container">
          <div ref={(el) => this.slides = el} className="slides">
            {this.state.slides}
          </div>

          {
            this.props.images.length < 1 ? null :
            <div className="arrow-nav">
              <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large"  onClick={() => this.plusSlides(-1)} data-uk-slidenav-previous></a>
              <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large" onClick={() => this.plusSlides(1)}  data-uk-slidenav-next></a>
            </div>
          }

          <div className="uk-position-bottom-center uk-position-medium">
            <ul ref={(el) => this.dots = el} className="dot-nav uk-dotnav uk-flex-nowrap">
              {this.state.dots}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
