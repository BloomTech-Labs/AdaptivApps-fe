import React from 'react';
import { Router, Switch } from 'react-router-dom';

// Components
import DashRouter from './pages/DashRouter';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';

// Auth0 imports
// import { Auth0Provider } from './components/auth/react-auth0-spa';
// import config from './components/auth/auth_config.json';
import history from './utils/History';

// Styling
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          {/* Moving NavBar to LandingPage once we build sidebar nav */}
          <NavBar />
        </header>
        <Switch>
          <PrivateRoute exact path="/" component={DashRouter} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
