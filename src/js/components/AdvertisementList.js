import axios from 'axios';
import constants from '../utility/constants';

import React, { Component } from 'react';
import Ad from './AdvertisementListElement';

export default class AdvertisementList extends Component {
  constructor(props){
    super(props);

    this.state = {
      advertisements: []
    };
  }

  componentDidMount() {
    let self = this;

    // Try to get a list of available advertisements.
    axios.get(constants.HOST + '/service/v1/advertisements')
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          self.setState({
            advertisements: response.data
          });
        }
        else {
          console.log("No advertisements found");
        }
      });
  }

  render(){
    if (this.state.ad === null)
      return (<div>Loading...</div>);
      
    var ads = this.state.advertisements.map(
      ad => <Ad key={ad.id} ad={ad}/>
    );

    return (
      <div className="ad-list">
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" data-uk-grid>
          {ads}
        </div>
      </div>
    );
  }
}
