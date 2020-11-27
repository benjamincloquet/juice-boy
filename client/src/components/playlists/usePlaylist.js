import axios from 'axios';
import { useState, useEffect } from 'react';

export default (playlistId) => {
  const [songs, setSongs] = useState(null);
  const [addingSong, setAddingSong] = useState(false);

  const getSongs = async () => {
    const res = await axios.get(`/api/song/${playlistId}`);
    setSongs(res.data);
  };

  useEffect(async () => {
    await getSongs();
  }, [playlistId]);

  const addSong = async (song) => {
    setAddingSong(true);
    const res = await axios.post(`/api/song/${playlistId}`, song);
    setSongs(res.data);
    setAddingSong(false);
  };

  const deleteSong = async (id) => {
    const res = await axios.delete(`api/song/${playlistId}/${id}`);
    setSongs(res.data);
  };

  const reorderSongs = async (newSongs) => {
    await axios.put(`api/song/${playlistId}`, newSongs);
  };

  return {
    songs, addSong, addingSong, deleteSong, reorderSongs,
  };
};
