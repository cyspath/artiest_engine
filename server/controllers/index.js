const axios = require('axios');

exports.fetchArtists = (req, res, next) => {
  axios
    .get('https://api.spotify.com/v1/search', { params: { q: req.query.artist, type: 'artist'} })
    .then(resp => {
      return res.send(resp.data);
    })
    .catch((err) => {
      console.log("500 Error: ", err);
      res.status(500).send({ error: err });
    });
}
