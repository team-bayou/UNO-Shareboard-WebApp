import React, { Component } from 'react';

export default class EditButton extends Component {
  render(){
    return(
      <a href={this.props.href} className="edit-link uk-icon-link" data-uk-icon="icon: pencil; ratio: 1.5"></a>
    );
  }
}
