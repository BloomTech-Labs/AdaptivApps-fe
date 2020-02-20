import React from 'react';

// Reach Router imports
import { Router } from '@reach/router';

// Components
import LandingPage from './pages/LandingPage'
import DashRouter from './pages/DashRouter';
import NavBar from './components/NavBar';

// Styling
import './App.css';

// Auth0 imports
import history from './utils/History';
import { Auth0Provider } from './components/auth/react-auth0-spa';
import config from './components/auth/auth_config.json';

// Styling
import './App.css';

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
      >
        <NavBar />          
        <Router history={history}>
          <LandingPage path="/" />
          <DashRouter path="/dashboard" />
        </Router>
      </Auth0Provider>
    </div>
  );
}

export default App;
