const { ytdl, isValidYoutubeURL, getVideoTitle } = require('./ytdl');
const getFirstYoutubeSearchResult = require('./youtube').getFirstResult;

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
  currentRequest = requestQueue.pop();
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

const processQuery = async (context, query) => {
  if (await isValidYoutubeURL(query)) {
    return { context, url: query, title: await getVideoTitle(query) };
  }
  try {
    const url = await getFirstYoutubeSearchResult(query);
    return { context, url, title: await getVideoTitle(url) };
  } catch (err) {
    context.textChannel.send("Couldn't find any YouTube result for this term!");
    return null;
  }
};

const addRequest = async (context, query) => {
  const newRequest = await processQuery(context, query);
  if (!newRequest) {
    return;
  }
  requestQueue.push(newRequest);
  context.textChannel.send(`Added ${newRequest.title} to the queue.`);
  if (!currentRequest) {
    playNextRequest();
  }
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

exports.processCommand = (context, command, args) => {
  switch (command) {
    case 'play':
      addRequest(context, args.join(' '));
      break;
    case 'queue':
      showRequestQueue(context);
      break;
    default:
      context.textChannel.send(`"${command}" is not a command!`);
  }
};
