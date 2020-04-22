// Import dependencies
import React from "react";
// Reach Router imports
import { Router } from "@reach/router";
// Import route components
import DashRouter from "./routes/DashRouter";
import PrivateRoute from "./routes/PrivateRoute";
// Import page components
import EventsCalendar from "./pages/EventsCalendar";
import UserProfile from "./pages/UserProfile";
import MyEvents from "./pages/MyEvents";
import ActivityList from "./pages/ActivitiesList";
import MyEventDetails from "./pages/MyEventDetails";
import ManageEvents from "./pages/ManageEvents";
import Accessibility from "./pages/Landing/Legal/Accessibility";
import PrivacyPolicy from "./pages/Landing/Legal/PrivacyPolicy";
import ManageUsers from "./pages/ManageUsers";

// Import apollo server
import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";

// Google Analytics Imports
import ReactGA from "react-ga";
// Auth0 imports
import { useAuth0 } from "./config/react-auth0-spa";
import "./styles.css";

// New Apollo Migration Imports
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';

const trackingId = "UA-159556430-1";

(function initializeReactGA() {
  ReactGA.initialize(trackingId, { testMode: true });
  ReactGA.pageview("/");
})();

function App() {
  const { getIdTokenClaims } = useAuth0();

  // OLD Generate new apollo client start
  // const client = new ApolloClient({
  //   uri: process.env.REACT_APP_API_URL,
  //   credentials: "same-origin",
  //   request: async operation => {
  //     const token = await getIdTokenClaims();
      // Attach token to header
  //     operation.setContext(context => ({
  //       headers: {
  //         ...context.headers,
  //         Authorization: token.__raw,
  //       },
  //     }));
  //   },
  // });
  // OLD Generate new apollo client end

  //  New Generate new apollog client start
  const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
});
const client = new ApolloClient({
  cache,
  link
});
  
  const request = async (operation) => {
    const token = await getIdTokenClaims();
    operation.setContext({
      headers: {
        authorization: token.__raw,
      }
    });
  };
  
  const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
  
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
  );
  
  // const client = new ApolloClient({
  //   link: ApolloLink.from([
  //     onError(({ graphQLErrors, networkError }) => {
  //       if (graphQLErrors) {
  //         sendToLoggingService(graphQLErrors);
  //       }
  //       if (networkError) {
  //         logoutUser();
  //       }
  //     }),
  //     requestLink,
  //     withClientState({
  //       defaults: {
  //         isConnected: true
  //       },
  //       resolvers: {
  //         Mutation: {
  //           updateNetworkStatus: (_, { isConnected }, { cache }) => {
  //             cache.writeData({ data: { isConnected }});
  //             return null;
  //           }
  //         }
  //       },
  //       cache
  //     }),
  //     new HttpLink({
  //       uri: process.env.REACT_APP_API_URL,
  //       credentials: "same-origin",
  //     })
  //   ]),
  // });


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
            <MyEvents path="myevents" />
            <MyEventDetails path="myevents/:eventId" />
            <ManageEvents path="manage" />
            <ManageUsers path="users" />
          </PrivateRoute>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
