import axios from 'axios';

export default async (name) => {
  try {
    await axios.post(`/api/validatePlaylist/${name}`);
  } catch (err) {
    if (err.response.status === 401) {
      return 'This playlist name is already taken';
    }
    return 'There was an issue with the server. Please retry later.';
  }
  return false;
};
