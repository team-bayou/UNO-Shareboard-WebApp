import React, { Component } from 'react';
import '../../css/styles.css';

const api = require('../utility/api');

export default class EditCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    }

    this.catToDelete = -1;
    this.categoriesToEdit = [];

    this.performDelete = this.performDelete.bind(this);
    this.setDeleteTarget = this.setDeleteTarget.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
    this.submitCategoryEdit = this.submitCategoryEdit.bind(this);
  }

  componentDidMount() {
    api.getCategories(function(success, response) {
      this.setState({
        categories: response.data
      });
    }.bind(this));
  }

  performDelete(event) {
    event.preventDefault();
    api.deleteCategory(this.catToDelete, function(success, response) {
      if (success) {
        window.location.reload();
      }
      else {
        console.log("There was a problem deleting the category:");
        console.log(response);
      }
    });
  }

  setDeleteTarget(event) {
    // slice off the "cat" from the beginning of the id to get just the number
    this.catToDelete = event.currentTarget.id.slice(3);
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

    for (var i = 0; i < this.categoriesToEdit.length; i++) {
      console.log(this.categoriesToEdit[i]);
    }
    console.log("------");
  }

  render() {
    if (this.state.categories) {
      var cats = this.state.categories.map(
        cat =>
        <tr key={cat.id}>
          <td>
            <a id={"cat" + cat.id} href="#confirm-delete" className="uk-link-reset" data-uk-icon="icon: close" onClick={this.setDeleteTarget} data-uk-toggle></a>
          </td>
          <td style={{backgroundColor: cat.color}}>
          </td>
          <td className="uk-text-nowrap">
            <input name={"cat" + cat.id + "title"} className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.title} onChange={this.handleCategoryEdit} />
          </td>
          <td className="uk-text-nowrap">
            <input name={"cat" + cat.id + "desc"} className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.description} onChange={this.handleCategoryEdit} />
          </td>
        </tr>
      );

      return (
        <div className="uk-overflow-auto">
          <table className="uk-table uk-table-small uk-table-middle">
            <thead>
              <tr>
                <th></th>
                <th className="uk-text-center">Color</th>
                <th className="uk-text-center">Title</th>
                <th className="uk-text-center">Description</th>
            </tr>
            </thead>
            <tbody>
              {cats}
              <tr>
                <td colSpan="4">
                  <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Save Changes" onClick={this.submitCategoryEdit}>Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="confirm-delete" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
              <p>Are you sure you want to delete this category?<br />This cannot be undone.</p>
              <p className="uk-text-right">
                <button className="uk-button uk-button-secondary" type="button" onClick={this.performDelete}>Yes</button>
                <button className="uk-button uk-button-default uk-modal-close" type="button">No</button>
              </p>
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
