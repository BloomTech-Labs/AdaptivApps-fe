import React from 'react';
import { Router } from '@reach/router';

// Components
import DashRouter from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { useGetToken } from './components/auth/Auth';

// Auth0 imports
// import { Auth0Provider } from './components/auth/react-auth0-spa';
// import config from './components/auth/auth_config.json';
// import history from './utils/History';

// Styling
import './App.css';
import UserDashboard from './pages/DashRoute/components/UserDashboard';
// import EventList from './pages/EventList';

function App() {
  const [token] = useGetToken();
  console.log('THE ONE TOKEN TO RULE THEM ALL!!!! ', token);
  const client = new ApolloClient({
    uri: 'http://localhost:8000',
    request: operation => {
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          Authorization: token,
        },
      }));
    },
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <PrivateRoute path="/" component={DashRouter}>
            <UserDashboard path="/" />
            {/* <EventList path="events" /> */}
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
