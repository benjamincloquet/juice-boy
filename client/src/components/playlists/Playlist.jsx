/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import PlaylistSongInput from './PlaylistSongInput';
import PlaylistSong from './PlaylistSong';
import usePlaylist from './usePlaylist';
import DraggableList from './DraggableList';

const Playlist = ({ playlist, remove }) => {
  const {
    songs, addSong, addingSong, deleteSong, reorderSongs,
  } = usePlaylist(playlist.id);

  const onSongSubmit = async (url) => {
    await addSong({ url });
  };

  const onChangeSongOrder = (newSongOrder) => {
    const reorderedSongs = [...songs];
    reorderedSongs.sort((a, b) => newSongOrder.indexOf(songs.indexOf(a)) - newSongOrder.indexOf(songs.indexOf(b)));
    reorderSongs(reorderedSongs);
  };

  const renderSongs = () => {
    if (!songs) {
      return (
        <div className="ui placeholder">
          <div className="line" />
          <div className="line" />
          <div className="line" />
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      );
    }

    if (songs.length === 0) {
      return <p>No songs added yet.</p>;
    }

    return (
      <DraggableList onChangeOrder={onChangeSongOrder}>
        {songs.map((song) => (
          <PlaylistSong
            key={song.id}
            song={song}
            remove={() => deleteSong(song.id)}
          />
        ))}
      </DraggableList>
    );
  };

  return (
    <div className="sixteen wide column">
      <div className="ui padded grid">
        <div className="fifteen wide column">
          <h1 className="ui header">{playlist.name}</h1>
        </div>
        <div className="one wide column">
          <button type="button" className="ui icon button basic red" onClick={remove}>
            <i className="right trash icon" />
          </button>
        </div>
        <div className="sixteen wide column">{renderSongs()}</div>
        <div className="sixteen wide column"><PlaylistSongInput onSubmit={onSongSubmit} loading={addingSong} /></div>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default Playlist;
