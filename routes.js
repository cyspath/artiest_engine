const path = require('path');
const Controller = require('./server/controllers/index');

module.exports = (app) => {
  app.get('/api/fetch_artists', Controller.fetchArtists);
  app.get('/api/fetch_artists_by_genres', Controller.fetchArtistsByGenres);

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
};
