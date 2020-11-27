import { useContext } from 'react';
import { UserContext } from '../UserContext';
import usePlaylists from './usePlaylists';
import Playlist from './Playlist';
import PlaylistNameInput from './PlaylistNameInput';

const PlaylistPage = () => {
  const {
    playlists, addPlaylist, deletePlaylist, addingPlaylist,
  } = usePlaylists();

  const { user } = useContext(UserContext);

  const renderPlaylists = () => {
    if (playlists === null) {
      return <div className="ui active centered inline loader" />;
    }
    if (playlists.length === 0) {
      return <p>No playlists created yet.</p>;
    }

    return playlists.map((playlist) => (
      <Playlist
        key={playlist.id}
        playlist={playlist}
        remove={() => deletePlaylist(playlist.id)}
      />
    ));
  };

  const onPlaylistSubmit = (name) => {
    addPlaylist({ name });
  };

  return (
    <div className="ui container">
      <div className="ui padded grid">
        <div className="ui column">
          <h1 className="ui header">
            {user ? <img className="ui image" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} alt="avatar" /> : null}
            <div className="content">
              {`Welcome ${user ? user.username : null}!`}
            </div>
          </h1>
          <div className="ui divider" />
          {renderPlaylists()}
          <div className="ui divider" />
          <PlaylistNameInput loading={addingPlaylist} onSubmit={onPlaylistSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
