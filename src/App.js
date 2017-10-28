import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SearchBar from './components/search_bar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          Five-Day Weather Forecast
          <SearchBar />
        </div>
      </Provider>
    );
  }
}

export default App;
