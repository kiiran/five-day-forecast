import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './components/search_bar';
import WeatherResults from './components/weather_results';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              <div id="top">
                <h1 style={{marginBottom: "25px"}}>Five-Day Weather Forecast</h1>
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="row">
            <WeatherResults />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
