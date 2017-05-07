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
    actions.fetchArtists(this.state.value, this.updateArtists.bind(this));
    this.setState({ status: `Looking for artists with name ${this.state.value}...` });
  }

  updateArtists(list) {
    console.log(list);
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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
          <input type="submit" value="Search for Artist" />
        </form>
        <div>{this.state.status}</div>
        {artists}
      </div>
    );
  }
}
