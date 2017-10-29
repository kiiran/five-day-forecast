import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OneDayWeather from './one_day_weather';

class WeatherResults extends Component {
  renderForecast(forecast) {
    if (!forecast.city) return;
    const { city, list } = forecast;
    const cityName = city.name;
    const days = sortWeatherIntoDays(list);
    
    return days.map(day => {
      const key = cityName + day.date;
      return <OneDayWeather key={key} data={day} />;
    });
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

function sortWeatherIntoDays(list) {
  const days = mergeDataForEachDay(list);
  return simplifyDailyData(days);
}

function mergeDataForEachDay(list) {
  const days = [];

  _.each(list, (item) => {
    const { dt_txt, wind, weather, main: {temp, pressure, humidity} } = item;
    const tempInCelcius = Math.round(temp - 273.15);
    const description = weather[0].description;
    const date = dt_txt.split(' ')[0];
    const dateObj = _.find(days, ['date', date]);

    if (dateObj) {
      dateObj.description.push( description );
      dateObj.humidity.push( humidity );
      dateObj.pressure.push( pressure );
      dateObj.temps.push( tempInCelcius );
      dateObj.windSpeed.push( wind.speed );
    } else if (days.length < 5) {
      days.push({ date,
        'description': [ description ],
        'humidity':    [ humidity ],
        'pressure':    [ pressure ],
        'temps':       [ tempInCelcius ],
        'windSpeed':   [ wind.speed ]
      });
    }
  });

  return days;
}

function simplifyDailyData(days){
  return _.each(days, (day) => {
    const { description, humidity, pressure, temps, windSpeed } = day;
    const sortedTemps = temps.sort((a, b) => { return a - b });

    day.minTemp = sortedTemps[0];
    day.maxTemp = sortedTemps[sortedTemps.length-1];

    day.humidity = Math.round(_.sum(humidity) / humidity.length);
    day.pressure = Math.round(_.sum(pressure) / pressure.length);
    day.windSpeed = Math.round(_.sum(windSpeed) / windSpeed.length);

    day.description = findMostCommon(description);
  });
}

function findMostCommon(array) {
  const counter = {};
  let mostCommon = array[0], maxCount = 1;

  _.each(array, el => {
    (counter[el]) ? counter[el]++ : counter[el] = 1;
    if (counter[el] > maxCount) {
      mostCommon = el;
      maxCount = counter[el];
    }
  });

  return mostCommon;
}

function mapStateToProps({weather}) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherResults);
