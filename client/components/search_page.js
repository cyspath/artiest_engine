import React, { Component } from 'react';
import * as actions from '../actions/search_page';

export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    actions.fetchArtists(this.state.value, this.showArtists.bind(this));
    this.setState({ value: "" });
    console.log('searching..');
  }

  showArtists(artists) {
    debugger
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        <input type="submit" value="Search for Artist" />
      </form>
    );
  }
}
