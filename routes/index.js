const router = require('express').Router();

require('./login').config(router);
require('./playlists').config(router);

module.exports = router;
