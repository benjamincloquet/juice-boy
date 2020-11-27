import axios from 'axios';
import { useState, useEffect } from 'react';

export default () => {
  const [playlists, setPlaylists] = useState(null);
  const [addingPlaylist, setAddingPlaylist] = useState(false);

  const getPlaylists = async () => {
    const res = await axios.get('/api/playlist');
    setPlaylists(res.data);
  };

  useEffect(async () => {
    await getPlaylists();
  }, []);

  const addPlaylist = async (playlist) => {
    setAddingPlaylist(true);
    const res = await axios.post('/api/playlist', playlist);
    setPlaylists((oldPlaylists) => [...oldPlaylists, res.data]);
    setAddingPlaylist(false);
  };

  const deletePlaylist = async (id) => {
    await axios.delete(`/api/playlist/${id}`);
    setPlaylists((oldPlaylists) => oldPlaylists.filter((playlist) => playlist.id !== id));
  };

  return {
    playlists, addPlaylist, deletePlaylist, addingPlaylist,
  };
};
