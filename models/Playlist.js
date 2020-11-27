const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

songSchema.set('toJSON', {
  virtuals: true,
});

const playlistSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'New Playlist',
  },
  songs: [songSchema],
});

playlistSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Playlist', playlistSchema, 'playlists');
