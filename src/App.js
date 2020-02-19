import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Components
import LandingPage from './pages/LandingPage';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';

// Auth0 imports
import { Auth0Provider } from "./components/auth/react-auth0-spa";
import config from "./components/auth/auth_config.json";
import history from "./utils/History";

// Styling
import './App.css';

// Routes the user to dashboard upon login
// const onRedirectCallback = appState => {
//   history.push(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : '/dashboard'
//     This is different : (window.location.pathname)
//   );
// };

function App() {
	return (
    <div className='App'>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        // onRedirectCallback={onRedirectCallback}
      >
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <PrivateRoute exact path='/' component={Profile} />
            {/* <PrivateRoute exact path='/dashboard' component={UserDashboard} /> */}
          </Switch>
        </Router>
      </Auth0Provider>  
    </div>
  );
}

export default App;
