import React, { Component } from 'react';

export default class AddAdvertisementForm extends Component {
  constructor(props){
    super(props);

    this.emptyFields = false;
    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";
    this.selectValid = "uk-select";
    this.selectInvalid = "uk-select uk-form-danger";
    this.radioLabelValid = "";
    this.radioLabelInvalid = "label-invalid";
    this.radioValid = "uk-radio";
    this.radioInvalid = "uk-radio radio-invalid";

    this.state = {
      title: '',
      description: '',
      category: '',
      owner: this.props.ownerId,
      timePublished: '',
      expirationDate: '',
      adType: '',
      price: '',
      tradeItem: '',
      titleStyle: this.inputValid,
      categoryStyle: this.selectValid,
      timePublishedStyle: this.inputValid,
      expirationDateStyle: this.inputValid,
      radioLabelStyle: this.radioLabelValid,
      adTypeStyle: this.radioValid
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // We reset the error message of each field
    //   so that there isn't any kind of weird interactions
    //   between empty field errors and invalid value errors.
    this.resetError(name, value);
  }

  handleSubmit(event){
    event.preventDefault();

    this.checkForEmptyFields();

    if (!this.emptyFields){
      this.props.handleSubmit(this.state);
    }
  }

  checkForEmptyFields() {
    let data = this.state;

    if (data.title === '' || data.category === '' || data.timePublished === '' ||
    data.expirationDate === '' || data.adType === '') {
      this.emptyFields = true;
    } else {
      this.emptyFields = false;
    }

    const ts = data.title === '' ? this.inputInvalid : this.inputValid;
    const cs = data.category === '' ? this.selectInvalid : this.selectValid;
    const tps = data.timePublished === '' ? this.inputInvalid : this.inputValid;
    const eds = data.expirationDate === '' ? this.inputInvalid : this.inputValid;
    const rls = data.adType === '' ? this.radioLabelInvalid : this.radioLabelValid;
    const ats = data.adType === '' ? this.radioInvalid : this.radioValid;

    this.setState({
      titleStyle: ts,
      categoryStyle: cs,
      timePublishedStyle: tps,
      expirationDateStyle: eds,
      radioLabelStyle: rls,
      adTypeStyle: ats
    });
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetError(name, value) {
    let style;
    if (name === 'title'){
      style = value === '' ? this.inputInvalid : this.inputValid;
    }
    else if (name === 'category'){
      style = value === '' ? this.selectInvalid : this.selectValid;
    }
    else if (name === 'timePublished'){
      style = value === '' ? this.inputInvalid : this.inputValid;
    }
    else if (name === 'expirationDate'){
      style = value === '' ? this.inputInvalid : this.inputValid;
    }
    else if (name === 'adType'){
      style = value === '' ? this.radioLabelInvalid : this.radioLabelValid;
      this.setState({
        radioLabelStyle: style
      });

      style = value === '' ? this.radioInvalid : this.radioValid;
    }

    this.setState({
      [name + 'Style']: style
    });
  }

  render() {
    return (
      <div>
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label label-invalid" htmlFor="ad-title" hidden={!this.emptyFields}>Please make sure all required fields are filled out</label>
                <label className="uk-form-label" htmlFor="ad-title">Title</label>
                <div className="uk-form-controls">
                  <input className={this.state.titleStyle} id="ad-title" type="text" placeholder="Some title..." name="title" onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-description">Description</label>
                <div className="uk-form-controls">
                  <textarea className="uk-textarea" id="ad-description" placeholder="Some description..." name="description" onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-categories">Category</label>
                <div className="uk-form-controls">
                  <select className={this.state.categoryStyle} id="ad-categories" name="category" defaultValue="-1" onChange={this.handleInputChange}>
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
                    <input className={this.state.timePublishedStyle} id="ad-time-published" type="date" name="timePublished" onChange={this.handleInputChange}/>
                  </div>
                </div>
                <div>
                  <label className="uk-form-label" htmlFor="ad-expiration-date">Expiration date</label>
                  <div className="uk-form-controls">
                    <input className={this.state.expirationDateStyle} id="ad-expiration-date" type="date" name="expirationDate" onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <div className="uk-form-label">Advertisement type</div>
              <div className="ad-type uk-form-controls">
                <label className={this.state.radioLabelStyle}><input className={this.state.adTypeStyle} type="radio" name="adType" value="offer" onChange={this.handleInputChange}/> Offer</label><br/>
                <label className={this.state.radioLabelStyle}><input className={this.state.adTypeStyle} type="radio" name="adType" value="seek" onChange={this.handleInputChange}/> Seek</label>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-price">Price</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="ad-price" type="number" step="0.01" placeholder="Some price ($)..." name="price" onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>
            <div className="uk-width-1-1">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="ad-trade-item">Trade item</label>
                <div className="uk-form-controls">
                  <input className="uk-input" id="ad-trade-item" type="text" placeholder="Some trade item..." name="tradeItem" onChange={this.handleInputChange}/>
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
