import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OneDayWeather from './one_day_weather';

class WeatherResults extends Component {
  renderForecast(forecast) {
    if (!forecast.city) return <div></div>;

    const { city, list } = forecast;
    const cityName = city.name;
    const days = sortWeatherIntoDays(list);

    return days.map(day => {
      const key = cityName + day.date;
      return <OneDayWeather key={key} data={day} />;
    });
  }

  render() {
    return (
      <div id="weather-results">
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
    const { description, id } = weather[0];
    const date = dt_txt.split(' ')[0];
    const dateObj = _.find(days, ['date', date]);

    if (dateObj) {
      dateObj.description.push( description );
      dateObj.humidity.push( humidity );
      dateObj.pressure.push( pressure );
      dateObj.temps.push( temp );
      dateObj.windSpeed.push( wind.speed );
      dateObj.iconID.push( id );
    } else if (days.length < 5) {
      days.push({ date,
        'description': [ description ],
        'humidity':    [ humidity ],
        'pressure':    [ pressure ],
        'temps':       [ temp ],
        'windSpeed':   [ wind.speed ],
        'iconID':      [ id ]
      });
    }
  });

  return days;
}

function simplifyDailyData(days){
  return _.each(days, (day) => {
    const { description, humidity, iconID, pressure, temps, windSpeed } = day;
    const sortedTemps = temps.sort((a, b) => { return a - b });

    day.minTemp = Math.round(sortedTemps[0]);
    day.maxTemp = Math.round(sortedTemps[sortedTemps.length-1]);

    day.humidity = Math.round(_.sum(humidity) / humidity.length);
    day.pressure = Math.round(_.sum(pressure) / pressure.length);
    day.windSpeed = Math.round(_.sum(windSpeed) / windSpeed.length);

    day.description = findMostCommon(description);
    day.iconID = findMostCommon(iconID);
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
