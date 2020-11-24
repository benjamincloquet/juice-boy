const axios = require('axios');

const api = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    type: 'video',
    maxResults: 1,
    key: process.env.YOUTUBE_API_KEY,
    order: 'relevance',
  },
});

exports.getFirstResult = async (query) => {
  const response = await api.get('/search', { params: { q: query } });
  return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
};
