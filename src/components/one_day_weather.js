import React, { Component } from 'react';

class OneDayWeather extends Component {
  render() {
    console.log("props in one day", this.props);
    return (
      <div>
        <p>I'm the OneDayWeather component</p>
      </div>
    );
  }
}

export default OneDayWeather;
