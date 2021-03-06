const ytdl = require('ytdl-core');

exports.ytdl = ytdl;

exports.isValidYoutubeURL = async (url) => ytdl.validateURL(url);

exports.getVideoTitle = async (url) => {
  try {
    const videoInfo = await ytdl.getBasicInfo(url);
    return videoInfo.videoDetails.title;
  } catch (err) {
    console.log(err);
    return null;
  }
};
