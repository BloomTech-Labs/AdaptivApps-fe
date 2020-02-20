import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';

// Reach Router imports
import { Router } from "@reach/router";

// Components
import LandingPage from './pages/LandingPage';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';

// Styling
import './App.css';

// Auth0 imports
import history from "./utils/History";
import { Auth0Provider } from "./components/auth/react-auth0-spa";
import config from "./components/auth/auth_config.json";


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
  
  // const { user } = useAuth0();
 
	return (
    

    <div className='App'>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        // onRedirectCallback={onRedirectCallback}
      >
        <NavBar />          
        <Router>
          <LandingPage path="/" />
          <Profile path="/dashboard" />
          {/* <PrivateRoute path='dashboard' /> */}
            {/* <PrivateRoute exact path='/dashboard' component={UserDashboard} /> */}
        </Router>
      </Auth0Provider>  
    </div>
  );
}

export default App;
