import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import $ from 'jquery';

import constants from '../../utility/constants';
import utils from '../../utility/utilities';

export default class ListingForm extends Component {
  constructor(props) {
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

    this.errorMsg = "";

    this.state = {
      id: this.props.ad ? this.props.ad.id : '',
      title: this.props.ad ? this.props.ad.title : '',
      description: this.props.ad ? this.props.ad.description || '' : '',
      category: this.props.ad ? this.props.ad.category.id : '',
      owner: this.props.ad ? this.props.ad.owner.id : this.props.ownerId,
      timePublished: this.props.ad ? new Date(this.props.ad.timePublished).toISOString() : new Date(Date.now()).toISOString(),
      expirationDate:  this.props.ad ? new Date(this.props.ad.expirationDate).toISOString() : new Date(Date.now()).toISOString(),
      adType: this.props.ad ? this.props.ad.adType : '',
      price: this.props.ad ? this.props.ad.price || '' : '',
      tradeItem: this.props.ad ? this.props.ad.tradeItem || '' : '',
      titleStyle: this.inputValid,
      categoryStyle: this.selectValid,
      radioLabelStyle: this.radioLabelValid,
      adTypeStyle: this.radioValid,

      submissionFailed: false,

      existingImages: this.props.ad ? this.props.ad.imageIDs : [],
      newImages: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.deleteListing = this.deleteListing.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value + ""
    });

    // We reset the error message of each field
    //   so that there isn't any kind of weird interactions
    //   between empty field errors and invalid value errors.
    this.resetError(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.submitlistingbtn.setAttribute("disabled", "disabled");

      if (!this.props.edit) {
        utils.addNewListing(this.state, function(exists, response) {
          if (exists && response) {
            browserHistory.push("/listings/" + response.data);
          }
          else {
            this.setState({
              submissionFailed: true
            });
            this.errorMsg = "There was a problem when creating your listing. Please try again, or contact us if the problem continues.";
            this.refs.submitlistingbtn.removeAttribute("disabled");
            $('html, body').animate({ scrollTop: $("#addlistingheader").offset().top - 25 }, 'fast');
          }
        }.bind(this));
      }
      else {
        utils.updateListing(this.state, function(exists, response) {
          if (exists && response) {
            browserHistory.push("/listings/" + this.state.id);
          }
          else {
            this.setState({
              submissionFailed: true
            });
            this.errorMsg = "There was a problem when updating your listing. Please try again, or contact us if the problem continues.";
            this.refs.submitlistingbtn.removeAttribute("disabled");
            $('html, body').animate({ scrollTop: $("#addlistingheader").offset().top - 25 }, 'fast');
          }
        }.bind(this));
      }
    }
  }

  checkForEmptyFields() {
    let data = this.state;

    if (data.title === '' || data.category === '' || data.adType === '') {
      this.emptyFields = true;
      $('html, body').animate({ scrollTop: $("#addlistingheader").offset().top - 25 }, 'fast');
    } else {
      this.emptyFields = false;
    }

    const ts = data.title === '' ? this.inputInvalid : this.inputValid;
    const cs = data.category === '' ? this.selectInvalid : this.selectValid;
    const rls = data.adType === '' ? this.radioLabelInvalid : this.radioLabelValid;
    const ats = data.adType === '' ? this.radioInvalid : this.radioValid;

    this.setState({
      titleStyle: ts,
      categoryStyle: cs,
      radioLabelStyle: rls,
      adTypeStyle: ats
    });
  }

  // Reset all of our error indicators so that we have a clean form to
  //   check for errors on.
  resetError(name, value) {
    let style;
    if (name === 'title') {
      style = value === '' ? this.inputInvalid : this.inputValid;
    }
    else if (name === 'category') {
      style = value === '' ? this.selectInvalid : this.selectValid;
    }
    else if (name === 'adType') {
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

  onDrop(files) {
    // eslint-disable-next-line
    for (var i in files) {
      this.state.newImages.push(files[i]);
    }
    this.setState({
      dropRejected: false
    })
  }

  onDropRejected(files) {
    this.setState({
      dropRejected: true
    });
    this.errorMsg = "You can only upload images";
    $('html, body').animate({ scrollTop: $("#addlistingheader").offset().top - 25 }, 'fast');
  }

  removeImage(event) {
    if (event.target.name.includes("new")) {
      let index = event.target.name.slice(18);
      this.state.newImages.splice(index, 1);
    }
    else {
      let index = event.target.name.slice(23);
      this.state.existingImages.splice(index, 1);
    }
    this.setState({}); // We call an empty setState just to force a re-render
  }

  deleteListing() {
    this.refs.deletelistingbtn.setAttribute("disabled", "disabled");
    utils.deleteListing(this.state.id, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        this.setState({
          submissionFailed: true
        });
        this.errorMsg = "There was a problem deleting this listing. Please try again, or contact us if the problem continues.";
        this.refs.deletelistingbtn.removeAttribute("disabled");
        $('html, body').animate({ scrollTop: $("#addlistingheader").offset().top - 25 }, 'fast');
      }
    }.bind(this));
  }

  render() {

    var displayExistingImages = null;
    var displayNewImages = null;

    if (this.props.ad) {
      displayExistingImages = this.state.existingImages.map(
        function(img, index) {
          return (
            <img key={index} name={"existing-image-preview-" + index} src={constants.HOST + '/service/v1/images/get/' + this.state.existingImages[index]} className="uk-margin-small-right uk-margin-small-top uk-margin-small-bottom" alt="preview" width="200" height="200" onClick={this.removeImage} />
          );
        }.bind(this)
      );
    }

    displayNewImages = this.state.newImages.map(
      function(img, index) {
        return (
          <img key={index} name={"new-image-preview-" + index} src={this.state.newImages[index].preview} className="uk-margin-small-right uk-margin-small-top uk-margin-small-bottom" alt="preview" width="200" height="200" onClick={this.removeImage} />
        );
      }.bind(this)
    );

    return (
      <div>

        {
          this.emptyFields ?
          <div className="uk-alert-danger uk-text-center" data-uk-alert>
            <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
          </div>
          : null
        }
        {
          this.state.submissionFailed || this.state.dropRejected ?
          <div className="uk-alert-danger uk-text-center" data-uk-alert>
            <p><span data-uk-icon="icon: warning"></span> {this.errorMsg}</p>
          </div>
          : null
        }

        <div className="uk-grid uk-margin-medium-bottom" data-uk-grid>
          <div className="uk-width-1-4@m">
            <div className="uk-margin">
              <label className="uk-form-label form-label">Listing Images</label>
              <Dropzone className="uk-width-1-1 new-listing-image-dropper" onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple={true} preventDropOnDocument={true} accept={"image/*"}>
                <div className="uk-text-center info-list uk-padding-large">
                  <span data-uk-icon="icon: cloud-upload"></span><br/>
                  Drag and drop or click to select images to upload
                </div>
              </Dropzone>
            </div>
          </div>
          <div className="uk-width-3-4@m">
            <div className="uk-margin">
              <label className="uk-form-label form-label">Images Preview (click image to remove)</label><br />
              <div className="new-listing-image-preview">
                {this.state.newImages.length > 0 || this.state.existingImages.length > 0 ? <span className="uk-margin-small-right"></span> : null}
                {displayExistingImages}
                {displayNewImages}
              </div>
            </div>
          </div>
        </div>

        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset uk-grid-small" data-uk-grid>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="ad-title">Title <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <input className={this.state.titleStyle} id="listing-title" type="text"
                      placeholder="The title of your listing" name="title"
                      value={this.state.title} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="listing-description">Description</label>
                  <div className="uk-form-controls">
                    <textarea className="uk-textarea" id="listing-description"
                      placeholder="The description of the item you're seeking / offering" name="description"
                      value={this.state.description} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="listing-categories">Category <span className="label-invalid">*</span></label>
                  <div className="uk-form-controls">
                    <select className={this.state.categoryStyle} id="listing-categories" name="category"
                      defaultValue={this.state.category ? this.state.category : "-1"} onChange={this.handleInputChange}>
                      <option disabled value="-1"> -- Select a category -- </option>
                      {this.props.categories}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-margin">
                <div className="uk-form-label form-label">What kind of listing is this? <span className="label-invalid">*</span></div>
                <div className="listing-type uk-form-controls">
                  <label className={this.state.radioLabelStyle}>
                    <input className={this.state.adTypeStyle} type="radio" name="adType"
                      value="offer" onChange={this.handleInputChange}
                      defaultChecked={this.state.adType === "offer" ? true : false}/> I'm offering this item
                  </label>
                  <br/>
                  <label className={this.state.radioLabelStyle}>
                    <input className={this.state.adTypeStyle} type="radio" name="adType"
                      value="seek" onChange={this.handleInputChange}
                      defaultChecked={this.state.adType === "seek" ? true : false}/> I'm seeking this item
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-margin-medium-top">
                <div className="uk-placeholder uk-padding-small uk-background-muted uk-width-1-1">
                  <span className="uk-icon uk-margin-small-right" href="/home" data-uk-icon="icon: info"></span>
                  For the fields below, both can be filled in if you will accept / provide either form of payment, or neither can be filled in to offer / accept no payment.
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="listing-price">Price</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="listing-price" type="number" step="0.01"
                      placeholder="Amount you want / are offering in dollars" name="price"
                      value={this.state.price} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-1">
                <div className="uk-margin">
                  <label className="uk-form-label form-label" htmlFor="listing-trade-item">Trade Item</label>
                  <div className="uk-form-controls">
                    <input className="uk-input" id="listing-trade-item" type="text"
                      placeholder="An item you want / are offering as trade" name="tradeItem"
                      value={this.state.tradeItem} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="uk-width-1-3@s uk-width-1-4@m uk-align-center">
                <div className="uk-margin-medium-top">
                  <button ref="submitlistingbtn" className="button-success uk-button uk-button-large uk-width-1-1" type="submit" value="Submit">Submit</button>
                </div>
                {
                  this.props.edit ?
                  <div className="uk-margin-small-top">
                    <a href="#confirm-delete-listing" className="uk-button uk-button-secondary uk-button-large uk-width-1-1" data-uk-toggle>Delete Listing</a>
                  </div>
                  : null
                }

              </div>
            </div>
          </fieldset>
        </form>
        {
          this.props.edit ?
          <div id="confirm-delete-listing" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body uk-text-center">
              <p>Are you sure you want to delete this listing?<br />This cannot be undone.</p>
              <p className="uk-text-right">
                <button ref="deletelistingbtn" className="uk-button uk-button-secondary" type="button" onClick={this.deleteListing}>Yes</button>
                <button className="uk-button uk-button-default uk-modal-close" type="button">No</button>
              </p>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}
