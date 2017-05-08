import React, { Component } from 'react';
import * as actions from '../actions/search_page';
import Artist from './artist';

export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      status: "",
      artists: []
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value.trim() === "") {
      this.updateStatus("Please enter an artist's name");
      return;
    };
    actions.fetchArtists(this.state.value, this.updateArtists.bind(this));
    this.setState({ status: `Looking for artists with name ${this.state.value}...` });
  }

  updateArtists(list) {
    if (list.length > 0) {
      this.setState({  value: "", artists: list, status: `Showing ${list.length === 20 ? 'maximum ' : ''}${list.length} results` });
    } else {
      this.setState({  value: "", artists: list, status: "No artists found" });
    }
  }

  updateStatus(status) {
    this.setState({ status });
  }

  showArtists(list) {
    return this.state.artists.map((artist) => {
      return <Artist key={artist.id}
                     artist={artist}
                     updateArtists={this.updateArtists.bind(this)}
                     updateStatus={this.updateStatus.bind(this)} />
    });
  }


  render() {
    const artists = this.showArtists();
    return (
      <div className="page-container">
        <div className="title-text">Artist Engine</div>
        <div className="app-description-1">Built using Node.js, React.js, and Spotify API</div>
        <div className="app-description-2">Search for an artist below and see a list of possible matches. Clicking on a artist result will recurively search their genres until it finds other artists with similar genres. A simple cache is in place to prevent repeated API calls.</div>

        <div className="search-container">
          <form className="search" onSubmit={this.handleSubmit.bind(this)}>
            <input className="input-field" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="search for artist"/>
            <input className="input-button" type="submit" value="SEARCH" />
            <div className="status">{this.state.status}</div>
          </form>
          <div className="results">
            {artists}
          </div>
        </div>
      </div>
    );
  }
}
