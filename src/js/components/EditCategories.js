import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import '../../css/styles.css';

const utils = require('../utility/utilities');
const api = require('../utility/api');

export default class EditCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
      showColorPicker: false,
      colorPickerStartColor: "#FFFFFF",

      newcatcolor: '#FFFFFF',
      newcattitle: '',
      newcatdesc: '',

      submitFailed: false
    }

    this.catToDelete = -1;
    this.categoriesToEdit = [];

    this.catColorTarget = -1;
    this.newColor = "";

    this.errorMsg = "";

    this.performDelete = this.performDelete.bind(this);
    this.setDeleteTarget = this.setDeleteTarget.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
    this.submitCategoryEdit = this.submitCategoryEdit.bind(this);
    this.setColorTarget = this.setColorTarget.bind(this);

    this.addNewCategory = this.addNewCategory.bind(this);
    this.handleNewCategoryEdit = this.handleNewCategoryEdit.bind(this);

    this.showColorPicker = this.showColorPicker.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.setNewColor = this.setNewColor.bind(this);
    this.commitNewColor = this.commitNewColor.bind(this);
  }

  componentDidMount() {
    api.getCategories(function(success, response) {

      var sorted = response.data.sort(function(a,b) {
        if (a.id < b.id)
          return -1;
        if (a.id > b.id)
          return 1;
        return 0;
      });

      this.setState({
        categories: sorted
      });
    }.bind(this));
  }

  showColorPicker(event) {
    this.setState({
      showColorPicker: true
    });
  }

  closeColorPicker(event) {
    this.setState({
      showColorPicker: false
    });
  }

  setNewColor(color, event) {
    this.newColor = color.hex;
  }

  commitNewColor(event) {
    document.getElementsByName(this.catColorTarget)[0].style.backgroundColor = this.newColor;
    if (this.catColorTarget === "newcatcolorbg") {
      this.setState({
        newcatcolor: this.newColor
      })
    }
    else {
      var catid = "catcolor" + this.catColorTarget.slice(10);
      this.setState({
        [catid]: this.newColor
      });
    }
    this.closeColorPicker(event);
  }

  performDelete(event) {
    event.preventDefault();
    this.refs.deletecategorybtn.setAttribute("disabled", "disabled");

    api.deleteCategory(this.catToDelete, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        this.setState({
          submitFailed: true
        });
        this.errorMsg = "There was a problem deleting the category";
        this.refs.deletecategorybtn.removeAttribute("disabled");
      }
    });
  }

  setDeleteTarget(event) {
    // slice off the "cat" from the beginning of the id to get just the number
    this.catToDelete = event.currentTarget.id.slice(3);
  }

  setColorTarget(event) {
    if (event.currentTarget.name !== "newcatcolor")
      this.catColorTarget = "catcolorbg" + event.currentTarget.name.slice(8);
    else
      this.catColorTarget = "newcatcolorbg";

    const td = document.getElementsByName(this.catColorTarget)[0];
    this.setState({
      colorPickerStartColor: td.style.backgroundColor
    });

    this.showColorPicker(event);
  }

  handleCategoryEdit(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (!this.categoriesToEdit.includes(name)) {
      this.categoriesToEdit.push(name);
    }

    if (this.categoriesToEdit.includes(name) && value === target.defaultValue) {
      this.categoriesToEdit.splice(this.categoriesToEdit.indexOf(name), 1);
    }
  }

  submitCategoryEdit(event) {
    event.preventDefault();

    let updates = [];
    const re = /^cat[a-z]+[0-9]+$/;

    for (let item in this.state) {
      if (re.test(item)) {
        let id = item.slice(item.search(/\d/));
        let val = this.state[item];
        let element = item.slice(3, item.search(/\d/));

        updates.push({id: id, element: element, value: val});
      }
    }

    if (updates.length > 0)
      this.refs.editcategorybtn.setAttribute("disabled", "disabled");

    utils.updateCategories(updates, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        this.setState({
          submitFailed: true
        });
        this.errorMsg = "There was a problem updating the category/ies";
        this.refs.editcategorybtn.removeAttribute("disabled");
      }
    }.bind(this));
  }

  addNewCategory(event) {
    event.preventDefault();

    if (!!this.state.newcatcolor &&
        !!this.state.newcattitle &&
        !!this.state.newcatdesc) {
      let data = {
        title: this.state.newcattitle,
        color: this.state.newcatcolor,
        description: this.state.newcatdesc
      }
      api.addCategory(data, function(success, response) {
        if (success) {
          window.location.reload();
        }
        else {
          this.setState({
            submitFailed: true
          });
          this.errorMsg = "There was a problem adding the new category";
        }
      }.bind(this));
    }
  }

  handleNewCategoryEdit(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.categories) {
      var cats = this.state.categories.map(
        cat =>
        <tr key={cat.id}>
          <td className="uk-text-center">
            <a id={"cat" + cat.id} href="#confirm-delete-category" className="cross-icon" data-uk-icon="icon: close; ratio: 1.5" onClick={this.setDeleteTarget} data-uk-toggle title="Delete Category" data-uk-tooltip></a>
          </td>
          <td className="uk-text-center uk-text-nowrap uk-table-link">
            <a href={"/advertisements/categories/" + cat.id} className="uk-link-reset" title="View Category" data-uk-tooltip>{cat.id}</a>
          </td>
          <td name={"catcolorbg" + cat.id} className="uk-table-link" style={{backgroundColor: cat.color}}>
            <a name={"catcolor" + cat.id} className="uk-link-reset" onClick={this.setColorTarget} title="Change Color" data-uk-tooltip>&nbsp;</a>
          </td>
          <td className="uk-text-nowrap">
            <input name={"cattitle" + cat.id} className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.title} onChange={this.handleCategoryEdit} />
          </td>
          <td className="uk-text-nowrap">
            <input name={"catdescription" + cat.id} className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.description} onChange={this.handleCategoryEdit} />
          </td>
        </tr>
      );

      return (
        <div className="uk-overflow-auto">
          {
            this.state.submitFailed ?
            <div className="uk-alert-danger uk-text-center" data-uk-alert>
              <p><span data-uk-icon="icon: warning"></span> {this.errorMsg}</p>
            </div>
            : null
          }
          <table className="uk-table uk-table-small uk-table-middle">
            <thead>
              <tr>
                <th className="edit-categories-corner"></th>
                <th className="uk-text-center">ID</th>
                <th className="uk-text-center">Color</th>
                <th className="uk-text-center">Title</th>
                <th className="uk-text-center">Description</th>
            </tr>
            </thead>
            <tbody>
              {cats}
              <tr>
                <td className="uk-text-center">
                  <a id="newcat" href="#" className="check-icon" data-uk-icon="icon: check; ratio: 1.5" onClick={this.addNewCategory} title="Add Category" data-uk-tooltip></a>
                </td>
                <td className="uk-text-center">TBD</td>
                <td name="newcatcolorbg" className="uk-table-link" style={{backgroundColor: "#FFFFFF"}} title="Change Color" data-uk-tooltip>
                  <a name="newcatcolor" className="uk-link-reset" onClick={this.setColorTarget}>&nbsp;</a>
                </td>
                <td className="uk-text-nowrap">
                  <input name="newcattitle" className="uk-input uk-form-blank admin-edit-field" type="text" placeholder="New Title" onChange={this.handleNewCategoryEdit} />
                </td>
                <td className="uk-text-nowrap">
                  <input name="newcatdesc" className="uk-input uk-form-blank admin-edit-field" type="text" placeholder="New Description" onChange={this.handleNewCategoryEdit} />
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  <button ref="editcategorybtn" className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="button" value="Save Changes" onClick={this.submitCategoryEdit}>Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="confirm-delete-category" data-uk-modal="center: true">
            <div className="uk-modal-dialog uk-modal-body uk-text-center">
              <p>Are you sure you want to delete this category?<br />This cannot be undone.</p>
              <p className="uk-text-right">
                <button ref="deletecategorybtn" className="uk-button uk-button-secondary" type="button" onClick={this.performDelete}>Yes</button>
                <button className="uk-button uk-button-default uk-modal-close" type="button">No</button>
              </p>
            </div>
          </div>

          <div className="color-picker" hidden={!this.state.showColorPicker}>
            <ChromePicker color={this.state.colorPickerStartColor} onChangeComplete={this.setNewColor}/>
            <div className="uk-text-center color-picker-btn-container">
              <a className="check-icon" data-uk-icon="icon: check; ratio: 1.5" onClick={this.commitNewColor} title="Confirm Color" data-uk-tooltip></a>
              <a className="cross-icon" data-uk-icon="icon: close; ratio: 1.5" onClick={this.closeColorPicker} title="Cancel" data-uk-tooltip></a>
            </div>
          </div>

        </div>
      );
    }

    else {
      return (
        <span></span>
      );
    }
  }
}
