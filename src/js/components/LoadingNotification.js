import React, { Component } from 'react';

import loadingGIF from '../../media/images/hourglass.gif';

export default class LoadingNotification extends Component {
  render() {
    return (
      <div className="uk-text-center center-page">
        <img src={loadingGIF} alt="Loading..." width="100" height="100" />
      </div>
    );
  }
}
