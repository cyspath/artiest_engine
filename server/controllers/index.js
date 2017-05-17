const axios = require('axios');
// const Store = require('../store/store'); // simple in memory cache

const cache = require('persistent-cache')(); // server independent cache

exports.fetchArtists = (req, res, next) => {
  const artist = req.query.artist;
  cache.get(artist, function(err, value) {
    if (!err) {
      if (value === undefined) { // query spotify and cache the result
        console.log('searching by artist: ', artist);
        axios
          .get('https://api.spotify.com/v1/search', { params: { q: artist, type: 'artist'} })
          .then(resp => {
            cache.put(artist, resp.data.artists.items, function() {
              res.send(resp.data.artists.items);
            })
          })
          .catch((err) => {
            console.log("500 Error: ", err);
            res.status(500).send({ error: err });
          });
      } else { // send value from cache
        console.log('Found cached artist: ', artist);
        return res.send(value);
      }
    }
  });
}


exports.fetchArtistsByGenres = (req, res, next) => {
  const genres = req.query.genres;
  cache.get(genres, function(err, value) {
    if (!err) {
      if (value === undefined) { // query spotify and cache the result
        recursiveSearch(genres);
      } else { // send value from cache
        console.log('Found cached genres: ', genres);
        res.send(value);
      }
    }
  });

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
          cache.put(genres, artists, function() {
            res.send(artists);
          })
        } else {
          return recursiveSearch(genres.slice(1));
        }
      })
      .catch((err) => {
        console.log("500 Error: ", err);
        res.status(500).send({ error: err });
      });
  }
}
