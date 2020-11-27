import PropTypes from 'prop-types';
import useInput from './useInput';
import validatePlaylistName from './validatePlaylistName';

const validateInput = (input) => {
  if (input.length === 0) {
    return 'Enter a playlist name';
  }
  return validatePlaylistName(input);
};

const PlaylistNameInput = ({ onSubmit, loading }) => {
  const {
    input, error, onInputChange, onEnter, onKeyPress,
  } = useInput(validateInput, onSubmit);

  return (
    <>
      <div>
        <div className={`ui input action ${error && 'error'}`}>
          <input type="text" placeholder="Playlist Name" value={input} onChange={onInputChange} onKeyPress={onKeyPress} />
          <button type="button" className={`ui button green ${loading && 'loading'} ${error && 'disabled red basic'}`} onClick={onEnter}>New Playlist</button>
        </div>
      </div>
      <div className={`ui pointing red basic label ${!error && 'hidden'}`}>
        {error}
      </div>
    </>
  );
};

PlaylistNameInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PlaylistNameInput;
