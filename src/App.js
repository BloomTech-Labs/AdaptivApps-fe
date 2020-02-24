import React from 'react';
import { Router, Switch } from 'react-router-dom';

// Components
import DashRouter from './pages/DashRouter';
import PrivateRoute from './utils/PrivateRoute';

// Auth0 imports
import { Auth0Provider } from './components/auth/react-auth0-spa';
import config from './components/auth/auth_config.json';
import history from './utils/History';

// Styling
import './App.css';

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        audience={config.audience}
        responseType={config.responseType}
        scope={window.scope}
      >
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={DashRouter} />
          </Switch>
        </Router>
      </Auth0Provider>
    </div>
  );
}

export default App;
