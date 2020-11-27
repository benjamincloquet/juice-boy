const isGuildMember = require('./middleware/isGuildMember');
const { getVideoTitle } = require('../services/ytdl');

const Playlist = require('../models/Playlist');

const getPlaylists = async (req) => Playlist.find({ userId: req.user.id }, 'id name');
const createPlaylist = async (req) => new Playlist({ userId: req.user.id, ...req.body }).save();
const deletePlaylist = async (req) => Playlist.findByIdAndDelete(req.params.playlistId);
const getPlaylist = async (req) => Playlist.findById(req.params.playlistId);
const getPlaylistByName = async (req) => Playlist.findOne({ name: req.params.playlistName });
const addSong = async (req) => {
  const song = { ...req.body, title: await getVideoTitle(req.body.url) };
  return Playlist.findByIdAndUpdate(req.params.playlistId, { $push: { songs: song } }, { new: true });
};
const deleteSong = async (req) => Playlist.findByIdAndUpdate(req.params.playlistId, { $pull: { songs: { _id: req.params.songId } } }, { new: true });
const editSongs = async (req) => Playlist.findByIdAndUpdate(req.params.playlistId, { songs: req.body }, { new: true });

exports.config = (router) => {
  router.get('/playlist', isGuildMember, async (req, res) => {
    try {
      const playlists = await getPlaylists(req);
      res.status(200).json(playlists);
    } catch (err) {
      res.status(503).json({ error: "Couldn't get playlists" });
    }
  });

  router.post('/validatePlaylist/:playlistName', isGuildMember, async (req, res) => {
    try {
      const playlist = await getPlaylistByName(req);
      if (playlist) {
        res.sendStatus(401);
      } else {
        res.sendStatus(200);
      }
    } catch (err) {
      res.status(503).json({ error: "Couldn't create playlist" });
    }
  });

  router.post('/playlist', isGuildMember, async (req, res) => {
    try {
      const playlist = await createPlaylist(req);
      res.status(201).json(playlist);
    } catch (err) {
      res.status(503).json({ error: "Couldn't create playlist" });
    }
  });

  router.delete('/playlist/:playlistId', isGuildMember, async (req, res) => {
    try {
      await deletePlaylist(req);
      res.sendStatus(200);
    } catch (err) {
      res.status(503).json({ error: "Couldn't delete playlist" });
    }
  });

  router.get('/song/:playlistId', isGuildMember, async (req, res) => {
    try {
      const playlist = await getPlaylist(req);
      res.status(200).json(playlist.songs);
    } catch (err) {
      res.status(503).json({ error: "Couldn't get songs" });
    }
  });

  router.post('/song/:playlistId', isGuildMember, async (req, res) => {
    try {
      const updatedPlaylist = await addSong(req);
      console.log(updatedPlaylist);
      res.status(201).json(updatedPlaylist.songs);
    } catch (err) {
      res.status(503).json({ error: "Couldn't create playlist" });
    }
  });

  router.delete('/song/:playlistId/:songId', isGuildMember, async (req, res) => {
    try {
      const updatedPlaylist = await deleteSong(req);
      res.status(201).json(updatedPlaylist.songs);
    } catch (err) {
      res.status(503).json({ error: "Couldn't delete playlist" });
    }
  });

  router.put('/song/:playlistId', isGuildMember, async (req, res) => {
    try {
      const updatedPlaylist = await editSongs(req);
      res.status(201).json(updatedPlaylist.songs);
    } catch (err) {
      res.status(503).json({ error: "Couldn't edit playlist" });
    }
  });
};
