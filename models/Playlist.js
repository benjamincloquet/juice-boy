const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  songs: [{
    url: {
      type: String,
      required: true,
    },
  }],
});

module.exports = mongoose.model('Playlist', playlistSchema, 'playlists');
