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
    const url = artist.images.length > 0 ? artist.images[0].url : "star.png";
    return (
      <div className="row artist-container" onClick={this.handleClick.bind(this)}>

        <div className="col-sm-3">
          <img className="avatar" src={url} />
        </div>

        <div className="col-sm-9">
          <div className="artist-name">{artist.name}</div>
          <div className="artist-popularity">popularity: {artist.popularity}</div>
          <div>{artist.genres.length > 0 && `Genres: ${artist.genres.join(", ")}`}</div>
        </div>

      </div>
    );
  }
}
<div class="row">
  <div class="col-sm-3">.col-12 .col-sm-6 .col-md-8</div>
  <div class="col-sm">.col-6 .col-md-4</div>
</div>
