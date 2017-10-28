import { WEATHER_FETCHED } from '../actions';

export default function(state = {}, { type, payload }) {
  switch (type) {
    case WEATHER_FETCHED:
      return payload;
    default:
      return state;
  }
}
