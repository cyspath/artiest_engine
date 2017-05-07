import axios from 'axios';

export function fetchArtists(artist, callback) {
  axios
    .get('/api/fetch_artists', { params: { artist } })
    .then(resp => {
      return callback(resp.data.artists.items);
    })
    .catch((err) => {
      console.log(err);
    });
}
