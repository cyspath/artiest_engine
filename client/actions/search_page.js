import axios from 'axios';

export function fetchArtists(artist, callback) {
  axios
    .get('/api/fetch_artists', { params: { artist } })
    .then(resp => {
      return callback(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchArtistsByGenres(genres, callback) {
  axios
    .get('/api/fetch_artists_by_genres', { params: { genres } })
    .then(resp => {
      return callback(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
