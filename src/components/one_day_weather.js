import React, { Component } from 'react';

const OneDayWeather = ({ data }) => {
  const {
    date, description, humidity, maxTemp, minTemp, pressure, windSpeed
  } = data;

  return (
    <div className="one-day-weather">
      <p className="date">{date}</p>
      <div className="temperature-summary">
        <p>Max: {maxTemp}&deg;</p>
        <p>Min: {minTemp}&deg;</p>
        <p>{description}</p>
      </div>
      <div className="more-details">
        <p>Wind speed: {windSpeed} m/s</p>
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
      </div>
    </div>
  );
};

export default OneDayWeather;
