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

    this.performDelete = this.performDelete.bind(this);
    this.setDeleteTarget = this.setDeleteTarget.bind(this);
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
        console.log("successfully deleted category " + this.catToDelete);
      }
      else {
        console.log(response);
      }
    });
  }

  setDeleteTarget(event) {
    // slice off the "cat" from the beginning of the id to get just the number
    this.catToDelete = event.currentTarget.id.slice(3);
  }

  render() {
    if (this.state.categories) {
      var cats = this.state.categories.map(
        cat =>
        <tr key={cat.id}>
          <td><a id={"cat" + cat.id} href="#confirm-delete" className="uk-link-reset" data-uk-icon="icon: close" onClick={this.setDeleteTarget} data-uk-toggle></a></td>
          <td style={{backgroundColor: cat.color}}></td>
          <td className="uk-text-nowrap">
            <input className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.title} />
          </td>
          <td className="uk-text-nowrap">
            <input className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.description} />
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
                  <button className="uk-button uk-button-secondary uk-align-center landing-submit-btn" type="submit" value="Save Changes">Save Changes</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="confirm-delete" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
              <p>Are you sure you want to remove this category?<br />This cannot be undone.</p>
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
