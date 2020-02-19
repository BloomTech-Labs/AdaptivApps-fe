import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Components
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/users/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';

// Styling
import './App.css';

// Auth0 imports
import history from "./utils/History";

function App() {

	return (
    <div className='App'>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          if (user[config.roleUrl]: "Admin") return {<PrivateRoute
            exact
            path='/dashboard/admin'
            component={AdminDashboard}
          />} else {
          <PrivateRoute exact path='/dashboard' component={UserDashboard} />
          }
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
