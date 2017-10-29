import { call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_WEATHER, weatherFetched } from '../actions';

const API_KEY = '?appid=b3ac2239be7ac8001b1c4bbc9b7c342e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast${API_KEY}`;

function fetchWeather(location) {
  const url = `${ROOT_URL}&q=${encodeURI(location)}&units=metric`;
  return axios.get(url);
}

function* callFetchWeather({ location }) {
  try {
    const response = yield call(fetchWeather, location);
    yield put(weatherFetched(response.data));
  } catch (e) {
    console.log(e.message);
  }
}

function* fetchWeatherSaga() {
  yield takeLatest(FETCH_WEATHER, callFetchWeather);
}

export default function* root() {
  yield [ fork(fetchWeatherSaga) ];
}
