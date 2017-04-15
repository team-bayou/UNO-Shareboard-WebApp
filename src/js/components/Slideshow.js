import React, { Component } from 'react';

export default class Slideshow extends Component {
  constructor(props){
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

  createSlides(){
    return (
      this.props.images.map(img =>
        <div key={img.imageId} className="slide fade">
          <img src={img.imageData} alt=""/>
        </div>
      )
    );
  }

  createDotNav(){
    return (
      this.props.images.map((img, index) =>
        <li key={img.imageId} className="dot">
          <a onClick={() => this.currentSlide(index + 1)}></a>
        </li>
      )
    );
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

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " uk-active";
  }

  render(){
    return(
      <div className="slideshow uk-inline uk-visible-toggle">
        <div className="slideshow-container">
          <div ref={(el) => this.slides = el} className="slides">
            {this.state.slides}
          </div>

          <div className="arrow-nav">
            <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-large"  onClick={() => this.plusSlides(-1)} data-uk-slidenav-previous></a>
            <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-large" onClick={() => this.plusSlides(1)}  data-uk-slidenav-next></a>
          </div>

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
