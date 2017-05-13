import React, { Component } from 'react';
// import loadJS from 'loadjs';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latLng: '',
    };
  }

  render() {
    return (
      <div>
        <h1>HogSpot</h1>
      </div>
    );
  }
}
