export const FETCH_WEATHER = 'FETCH_WEATHER';
export const WEATHER_FETCHED = 'WEATHER_FETCHED';

export const fetchWeather = location => ({
  type: FETCH_WEATHER, location: location
});

export const weatherFetched = data => ({
  type: WEATHER_FETCHED, payload: data
});
