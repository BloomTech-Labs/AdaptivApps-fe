// Import dependencies
import React from 'react';
// Reach Router imports
import { Router } from '@reach/router';

// Import components
import DashRouter from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';
import { useGetToken } from './components/auth/Auth';
import EventList from './pages/DashRoute/users/events/EventList';
import EventCalendarPage from './pages/DashRoute/users/events/EventCalendarPage';

// Import apollo server
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Google Analytics Imports
import ReactGA from 'react-ga';

const trackingId = 'UA-159556430-1';

(function initializeReactGA() {
  ReactGA.initialize(trackingId);
  ReactGA.pageview('/');
  console.log('trackingId', trackingId);
})();

function App() {
  // When app renders, call useGetToken() to get token from auth0 login
  const [token] = useGetToken();
  console.log('Token ---> ', token);

  // Generate new apollo client
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    request: operation => {
      // Attach token to header
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
          <PrivateRoute exact path="/" component={DashRouter} />
          <PrivateRoute exact path="/calendar" component={EventCalendarPage} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
