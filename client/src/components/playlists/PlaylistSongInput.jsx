import PropTypes from 'prop-types';
import useInput from './useInput';
import validateYoutubeUrl from './validateYoutubeUrl';

const validateInput = async (input) => {
  if (input.length === 0) {
    return 'Enter a YouTube video URL';
  }
  if (!(await validateYoutubeUrl(input))) {
    return 'Enter a valid YouTube video URL';
  }
  return false;
};

const PlaylistSongInput = ({ onSubmit, loading }) => {
  const {
    input, error, onInputChange, onEnter, onKeyPress,
  } = useInput(validateInput, onSubmit);

  return (
    <>
      <div className={`ui action input fluid  ${error && 'error'}`}>
        <input type="text" placeholder="Video URL" value={input} onChange={onInputChange} onKeyPress={onKeyPress} />
        <button type="button" className={`ui button ${loading && 'loading'} ${error && 'disabled red basic'}`} onClick={onEnter}>Add Song</button>
      </div>
      <div className={`ui pointing red basic label ${!error && 'hidden'}`}>
        {error}
      </div>

    </>
  );
};

PlaylistSongInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PlaylistSongInput;
