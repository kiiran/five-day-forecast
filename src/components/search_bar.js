import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { location: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ location: event.target.value.trim() });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { location } = this.state;

    this.props.fetchWeather(location);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for a city..."
          className="form-control"
          value={this.state.location}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn">
            <i className="fa fa-search" />
          </button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
