import React, { Component } from 'react';
import * as actions from '../actions/search_page';

export default class Artist extends Component {

  handleClick(e) {
    const genres = this.props.artist.genres;
    this.props.updateStatus(`Searching for artists from ${genres.length} genres: ${genres.join(",")}...`)
    actions.fetchArtistsByGenres(genres, this.props.updateArtists);
  }

  render() {
    const artist = this.props.artist;
    return (
      <div onClick={this.handleClick.bind(this)}>
        <div>{artist.name}</div>
        <div>
          <span>popularity: {artist.popularity}</span>
          <span>{artist.genres.length > 0 && `${artist.genres.join(", ")}`}</span>
        </div>

      </div>
    );
  }
}
