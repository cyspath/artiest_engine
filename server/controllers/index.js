const axios = require('axios');
const Store = require('../store/store');

exports.fetchArtists = (req, res, next) => {
  // use server simple cache first
  const artist = req.query.artist;
  if (Store.artists[artist]) {
    console.log('Found cached artist: ', artist);
    return res.send(Store.artists[artist]);
  }
  console.log('searching by artist: ', artist);
  // if no cache, query spotify
  axios
    .get('https://api.spotify.com/v1/search', { params: { q: artist, type: 'artist'} })
    .then(resp => {
      Store.artists[artist] = resp.data.artists.items;
      return res.send(resp.data.artists.items);
    })
    .catch((err) => {
      console.log("500 Error: ", err);
      res.status(500).send({ error: err });
    });
}


exports.fetchArtistsByGenres = (req, res, next) => {
  const genres = req.query.genres;
  // use server simple cache first
  if (Store.genres[genres]) {
    console.log('Found cached genres: ', genres);
    return res.send(Store.genres[genres]);
  }
  // if no cache, query spotify
  let artists = [];
  const recursiveSearch = (genres) => {
    if (!genres || genres.length <= 0) {
      return res.send(artists);
    }
    console.log('searching by genre: ', genres[0]);
    axios
      .get('https://api.spotify.com/v1/search', { params: { q: `genre:"${genres[0]}"`, type: 'artist'} })
      .then(resp => {
        artists = artists.concat(resp.data.artists.items)
        if (artists.length > 0) {
          Store.genres[genres] = artists;
          return res.send(artists);
        } else {
          return recursiveSearch(genres.slice(1));
        }
      })
      .catch((err) => {
        console.log("500 Error: ", err);
        res.status(500).send({ error: err });
      });
  }
  recursiveSearch(genres);
}
