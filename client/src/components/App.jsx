import { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { UserContext } from './UserContext';
import PlaylistPage from './playlists/PlaylistPage';
import useUser from './useUser';

const App = () => {
  const { user } = useContext(UserContext);
  useUser();

  const renderRoutes = () => {
    if (user === null) {
      return <div className="ui active centered inline loader" />;
    }
    return (
      <Switch>
        <Route exact path="/">
          {user.loggedIn ? <PlaylistPage /> : <Redirect to="/api/login" />}
        </Route>
      </Switch>
    );
  };

  return (
    <Router>
      {renderRoutes()}
    </Router>
  );
};

export default App;
