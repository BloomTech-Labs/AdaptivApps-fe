// Import dependencies
import React from 'react';
// Reach Router imports
import { Router } from '@reach/router';

// Import route components
import DashRouter from './routes/DashRouter';
import PrivateRoute from './routes/PrivateRoute';

// Import page components
import EventsCalendar from './pages/EventsCalendar';
import UserProfile from './pages/UserProfile';
import CreateEvent from './pages/CreateEvent';
import UserEvents from './pages/UserEvents';
import ActivityList from './pages/ActivitiesList';
// Import apollo server
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Google Analytics Imports
import ReactGA from 'react-ga';

// import get token function
import { useGetToken } from './config/Auth';

const trackingId = 'UA-159556430-1';

(function initializeReactGA() {
  ReactGA.initialize(trackingId);
  ReactGA.pageview('/');
})();

function App() {
  // When app renders, call useGetToken() to get token from auth0 login
  const [token] = useGetToken();
  console.log('Token ---> ', token);

  // Generate new apollo client
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    credentials: 'same-origin',
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
          <PrivateRoute path="/" component={DashRouter}>
            <UserProfile path="/" />
            <EventsCalendar path="calendar" />
            <ActivityList path="calendar/:eventId" />
            <CreateEvent path="events/create" />
            <UserEvents path="events" />
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
