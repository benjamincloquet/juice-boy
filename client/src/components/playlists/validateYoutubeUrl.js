import ytdl from 'ytdl-core';

export default async (url) => ytdl.validateURL(url);
