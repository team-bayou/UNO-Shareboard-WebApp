import React, { Component } from 'react';

export default class AddAdvertisementForm extends Component {
  render() {
    return (
      <div>
        <form className="uk-form-stacked" onSubmit={this.props.handleSubmit}>
          <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-title">Title</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="ad-title" type="text" placeholder="Some title..." name="title" onChange={this.props.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-description">Description</label>
                <div className="uk-form-controls">
                  <textarea className="uk-textarea" id="ad-description" placeholder="Some description..." name="description" onChange={this.props.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-categories">Select</label>
                <div className="uk-form-controls">
                  <select className="uk-select" id="ad-categories" name="category" defaultValue="-1" onChange={this.props.handleInputChange}>
                    <option disabled value="-1"> -- Select a category -- </option>
                    {this.props.categories}
                  </select>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-margin uk-grid-small uk-child-width-auto" data-uk-grid>
                <div>
                <label className="uk-form-label" htmlFor="ad-time-published">Time published</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="ad-time-published" type="date" name="timePublished" onChange={this.props.handleInputChange}/>
                  </div>
                </div>
                <div>
                  <label className="uk-form-label" htmlFor="ad-expiration-date">Expiration date</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="ad-expiration-date" type="date" name="expirationDate" onChange={this.props.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-form-label">Advertisement type</div>
              <div className="ad-type uk-form-controls">
                <label><input className="uk-radio" type="radio" name="adType" value="offer" onChange={this.props.handleInputChange}/> Offer</label><br/>
                <label><input className="uk-radio" type="radio" name="adType" value="seek" onChange={this.props.handleInputChange}/> Seek</label>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-price">Price</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="ad-price" type="number" step="0.01" placeholder="Some price ($)..." name="price" onChange={this.props.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-trade-item">Trade item</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="ad-trade-item" type="text" placeholder="Some trade item..." name="tradeItem" onChange={this.props.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin-large-top">
                <button className="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-align-center submit-btn" type="submit" value="Submit">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
