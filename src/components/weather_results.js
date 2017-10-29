import React, { Component } from 'react';
import { connect } from 'react-redux';
import OneDayWeather from './one_day_weather';

class WeatherResults extends Component {
  renderForecast(forecast) {
    if (!forecast.city) return;
    const { city, list } = forecast;
    console.log(forecast);
    const cityName = city.name;

    return (
      <div key={cityName}>
        <p style={{color: "blue"}}>{cityName}</p>
      </div>
    );
  }

  render() {
    console.log("props in results", this.props);
    return (
      <div>
        <p>I'm the WeatherResults component</p>
        {this.renderForecast(this.props.weather)}
      </div>
    );
  }
}

function mapStateToProps({weather}) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherResults);
