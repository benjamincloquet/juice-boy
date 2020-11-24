const isGuildMember = require('./middleware/isGuildMember');

const Playlist = require('../models/Playlist');

const createPlaylist = async (req) => new Playlist({ userId: req.user.id }).save();

const findOrCreatePlaylist = async (req) => {
  let playlist = await Playlist.findOne({ userId: req.user.id });
  if (!playlist) {
    playlist = await createPlaylist(req);
  }
  return playlist;
};

module.exports = (router) => {
  router.get('/playlist', isGuildMember, async (req, res) => {
    try {
      const playlist = await findOrCreatePlaylist(req);
      res.status(200).json(playlist);
    } catch (err) {
      res.status(503).json({ error: "Couldn't get playlist" });
    }
  });

  router.post('/cart', isGuildMember, async (req, res) => {
    try {
      const playlist = await findOrCreatePlaylist(req);
      playlist.songs = req.songs;
      await playlist.save();
      res.status(201).json(playlist);
    } catch (err) {
      res.status(503).json({ error: "Couldn't add products to the cart" });
    }
  });
};
