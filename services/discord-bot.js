const { ytdl, isValidYoutubeURL, getVideoTitle } = require('./ytdl');
const getFirstYoutubeSearchResult = require('./youtube').getFirstResult;

const Playlist = require('../models/Playlist');

const requestQueue = [];
let currentRequest = null;

const joinVoiceChannel = async (context) => {
  if (!context.voiceChannel) {
    context.textChannel.send('Please join a channel before requesting a song!');
    return null;
  }
  try {
    const connection = await context.voiceChannel.join();
    return connection;
  } catch (err) {
    context.textChannel.send("Couldn't join voice channel!");
    return null;
  }
};

const playNextRequest = async () => {
  currentRequest = requestQueue.shift();
  if (!currentRequest) {
    return;
  }
  const { context, url } = currentRequest;
  const connection = await joinVoiceChannel(context);
  if (!connection) {
    return;
  }
  try {
    const dispatcher = connection.play(await ytdl(url), { type: 'opus' });
    dispatcher.on('finish', playNextRequest);
  } catch (err) {
    context.textChannel.send("Couldn't play the song!");
  }
};

const addRequest = (request) => {
  requestQueue.push(request);
  request.context.textChannel.send(`🔊 ${request.title}`);
  if (!currentRequest) {
    playNextRequest();
  }
};

const getPlaylist = async (name) => Playlist.findOne({ name });

const playPlaylist = async (context, name) => {
  try {
    const playlist = await getPlaylist(name);
    if (playlist) {
      context.textChannel.send(`Playing playlist ${playlist.name}`);
      playlist.songs.map((song) => (addRequest({
        context,
        url: song.url,
        title: song.title,
      })));
      console.log(requestQueue);
    } else {
      context.textChannel.send("This playlist doesn't exist!");
    }
  } catch (err) {
    context.textChannel.send("Coudln't get playlists!");
  }
};

const processQuery = async (context, query) => {
  if (await isValidYoutubeURL(query)) {
    return { context, url: query, title: await getVideoTitle(query) };
  }
  try {
    const url = await getFirstYoutubeSearchResult(query);
    const title = await getVideoTitle(url);
    return { context, url, title };
  } catch (err) {
    context.textChannel.send("Couldn't find any YouTube result for this term!");
    return null;
  }
};

const processRequest = async (context, query) => {
  const newRequest = await processQuery(context, query);
  if (!newRequest) {
    return;
  }
  addRequest(newRequest);
};

const showRequestQueue = (context) => {
  if (!currentRequest) {
    context.textChannel.send('No song currently playing.');
    return;
  }
  context.textChannel.send(`Currently playing : ${currentRequest.title} (${currentRequest.url})`);
  if (requestQueue.length === 0) {
    context.textChannel.send('No song up next.');
  } else {
    context.textChannel.send(
      `Next up :\n>>> ${requestQueue.map((request) => (request.title)).join('\n')}`,
    );
  }
};

const clearRequestQueue = (context) => {
  requestQueue.length = 0;
  context.textChannel.send('Cleared the queue.');
};

exports.processCommand = (context, command, args) => {
  switch (command) {
    case 'play':
      processRequest(context, args.join(' '));
      break;
    case 'queue':
      showRequestQueue(context);
      break;
    case 'playlist':
      playPlaylist(context, args.join(' '));
      break;
    case 'skip':
      playNextRequest();
      break;
    case 'clear':
      clearRequestQueue(context);
      break;
    default:
      context.textChannel.send(`"${command}" is not a command!`);
  }
};
