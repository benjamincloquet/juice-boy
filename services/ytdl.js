const ytdl = require('ytdl-core-discord');

exports.ytdl = ytdl;

exports.isValidYoutubeURL = async (url) => ytdl.validateURL(url);

exports.getVideoTitle = async (url) => {
  try {
    const videoInfo = await ytdl.getBasicInfo(url);
    console.log(videoInfo.videoDetails);
    return videoInfo.videoDetails.title;
  } catch (err) {
    console.log(err);
    return null;
  }
};
