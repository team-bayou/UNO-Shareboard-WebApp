import React, { Component } from 'react';

export default class FilterComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userlogin: '',
        userid: '',

        userFound: false,
        searchSubmitted: false,
        foundUser: null
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
    }

    handleSubmit(event) {
      event.preventDefault();

    }

  render(){
    return(
      <div className="uk-flex-inline">
       <select className="uk-select uk-width-auto@m">
         <option>Sort by:</option>
         <option>Electronics</option>
         <option>Books</option>
         <option>Outdoor</option>
         <option>Notes</option>
         <option>Magazines</option>
         <option>Tools</option>
         <option>Accessories</option>
         <option>Clothes</option>
         <option>Furniture</option>
         <option>Others</option>
       </select>

       <form className="uk-search uk-search-default uk-width-auto@m">
         <input className="uk-search-input" type="search" placeholder="search..." />
       </form>
       
       <button className="uk-button uk-button-primary">Search</button>
      </div>
    )
  }
}
