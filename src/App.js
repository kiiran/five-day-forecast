import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar';

class App extends Component {
  render() {
    return (
      <div className="App">
        Five-Day Weather Forecast
        <SearchBar />
      </div>
    );
  }
}

export default App;
