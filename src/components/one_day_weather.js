import React from 'react';

const OneDayWeather = ({ data }) => {
  const {
    date, description, humidity, maxTemp, minTemp, pressure, windSpeed
  } = data;
  const day = new Date(date).toLocaleDateString("en-GB", { weekday: 'short' });
  const dateString = new Date(date).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' });

  return (
    <div className="one-day-weather">
      <div className="date">
        <h3>{day}<br />{dateString}</h3>
      </div>
      <div className="temperature-summary">
        <div className="temp">
          <span className="max-temp">{maxTemp}&deg;</span>
          <span> / {minTemp}&deg;</span>
        </div>
        <p>{description}</p>
        <table className="more-details">
          <tbody>
            <tr>
              <td>
                <i className="wi wi-strong-wind" />
              </td>
              <td>
                {windSpeed} m/s
              </td>
            </tr>
            <tr>
              <td>
                <i className="wi wi-humidity" />
              </td>
              <td>
                {humidity}%
              </td>
            </tr>
            <tr>
              <td>
                <i className="wi wi-barometer" />
              </td>
              <td>
                {pressure}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OneDayWeather;
