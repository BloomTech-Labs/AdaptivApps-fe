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
import AddActivity from './pages/AddActivity';
import UserEvents from './pages/UserEvents';
import ActivityList from './pages/ActivitiesList';
import UserEventDetails from './pages/UserEventDetails';
import ManageEvents from './pages/ManageEvents';
import Accessibility from './pages/Landing/Legal/Accessibility';
import PrivacyPolicy from './pages/Landing/Legal/PrivacyPolicy';

// Import apollo server
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Google Analytics Imports
import ReactGA from 'react-ga';

// Auth0 imports
import { useAuth0 } from './config/react-auth0-spa';

const trackingId = 'UA-159556430-1';

(function initializeReactGA() {
  ReactGA.initialize(trackingId);
  ReactGA.pageview('/');
})();

function App() {
  const { getIdTokenClaims } = useAuth0();

  // Generate new apollo client
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    credentials: 'same-origin',
    request: async operation => {
      const token = await getIdTokenClaims();
      // Attach token to headers
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          Authorization: token.__raw,
        },
      }));
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Accessibility path="/accessibility" />
          <PrivacyPolicy path="/privacy-policy" />
          <PrivateRoute path="/" component={DashRouter}>
            <UserProfile path="/" />
            <EventsCalendar path="calendar" />
            <ActivityList path="calendar/:eventId" />
            <CreateEvent path="events/create" />
            <AddActivity path="events/create/:eventId" />
            <UserEvents path="myevents" />
            <UserEventDetails path="myevents/:eventId" />
            <ManageEvents path="manage" />
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
