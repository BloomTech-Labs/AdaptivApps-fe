import React from 'react';
import AccessibilityModal from './components/AccessibilityModal';
// import Header from './components/Header';
import Home from './components/LandingPage';
// import Signup from './components/users/SignUp';
import UserDashboard from './components/users/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PrivateRoute from './utils/PrivateRoute';
// import Login from './components/auth/Login';
// import Logout from './components/Logout';
import { Router, Route, Switch } from 'react-router-dom';
import EditProfile from './components/ProfileForm';
import NavBar from './components/NavBar';

// Auth0 imports
import { Auth0Provider } from "./components/auth/react-auth0-spa";
import config from "./components/auth/auth_config.json";
import history from "./utils/history";

import './App.css';

// Routes the user to dashboard upon login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

function App() {
	return (
    <div className='App'>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Router history={history}>
          {/* <Header /> */}
          <header>
            <NavBar />
          </header>
          
          <AccessibilityModal />
          <Switch>
            <Route exact path='/Edit' component={EditProfile} />
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/Signup' component={Signup} /> */}
            {/* <Route exact path='/SignIn' component={Login} />
            <Route exact path='/logout' component={Logout} /> */}
            if (user[config.roleUrl]: "Admin") return {<PrivateRoute
              exact
              path='/dashboard/admin'
              component={AdminDashboard}
            />} else {
            <PrivateRoute exact path='/dashboard' component={UserDashboard} />
            }
          </Switch>
        </Router>
      </Auth0Provider>  
    </div>
	);
}

export default App;
