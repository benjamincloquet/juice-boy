import PropTypes from 'prop-types';

const Song = ({ song, remove }) => (
  <div className="ui padded grid">
    <div className="fifteen wide column">
      <h3 className="ui header">
        <i className="youtube icon" />
        <div className="content">
          {song.title}
          <a href={song.url} target="_blank" rel="noreferrer">
            <div className="sub header">{song.url}</div>
          </a>
        </div>
      </h3>
    </div>
    <div className="one wide column">
      <button type="button" className="ui icon button basic red small" onClick={remove}>
        <i className="right trash icon" />
      </button>
    </div>
  </div>
);

Song.propTypes = {
  song: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default Song;
