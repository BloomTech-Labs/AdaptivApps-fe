import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

// Components
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/users/UserDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';

// Styling
import './App.css';

// Auth0 imports
import history from "./utils/History";
// import { useAuth0 } from "./components/auth/react-auth0-spa";
// import config from "./components/auth/auth_config.json";



function App() {
  
  // const { user } = useAuth0();
 
	return (
    

    <div className='App'>
      {/* <Router history={history} user={user} config={config} > */}
      <Router history={history}> 
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path='/' component={LandingPage} />
         
          {/* if user[config.roleUrl].includes("Admin")
           return {<PrivateRoute
                    path='/dashboard/admin'
                    component={AdminDashboard}
                  /> } else {
            <PrivateRoute path='/dashboard' component={UserDashboard} />
          } */}
          <PrivateRoute path='/dashboard' component={UserDashboard} />
          
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
