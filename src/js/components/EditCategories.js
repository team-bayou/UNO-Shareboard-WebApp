import React, { Component } from 'react';
import '../../css/styles.css';

const api = require('../utility/api');

export default class EditCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null
    }
  }

  componentDidMount() {
    api.getCategories(function(success, response) {
      this.setState({
        categories: response.data
      });
    }.bind(this));
  }

  render() {
    var cats = "";
    if (this.state.categories) {
      cats = this.state.categories.map(
        cat =>
        <tr key={cat.id}>
          <td><a href="#" className="uk-link-reset" data-uk-icon="icon: close"></a></td>
          <td style={{backgroundColor: cat.color}}></td>
          <td className="uk-text-nowrap">
            <input className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.title} />
          </td>
          <td className="uk-text-nowrap">
            <input className="uk-input uk-form-blank admin-edit-field" type="text" defaultValue={cat.description} />
          </td>
        </tr>
      );
    }

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
      </div>
    );
  }
}
