// Import dependencies
import React, { useState } from "react";

// Reach Router imports
import { Router, createHistory, LocationProvider } from "@reach/router";

// Import route components
import DashRouter from "./routes/DashRouter";
import PrivateRoute from "./routes/PrivateRoute";

// Import page components
import EventsCalendar from "./pages/EventsCalendar";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/UserSettings/Settings";
import AccountInfo from "./pages/UserSettings/AccountInfo/";
import MyEvents from "./pages/MyEvents";
import ActivityList from "./pages/ActivitiesList";
import MyEventDetails from "./pages/MyEventDetails";
import CreateEvent from "./pages/ManageEvents/CreateEvent";
import EditEvent from "./pages/ManageEvents/EditEvent";
import EditActivity from "./pages/ManageEvents/EditActivity";
import CreateActivity from "./pages/ManageEvents/CreateActivity";
import Accessibility from "./pages/Landing/Legal/Accessibility";
import PrivacyPolicy from "./pages/Landing/Legal/PrivacyPolicy";
import ChatFeature from "./pages/Chat/index";
import SponsorSpotlight from "./pages/SponsorSpotlight/SponsorSpotlight";
import AdminDashboard from "./pages/AdminDashboard";
import Announcement from "./pages/Announcement";
import FAQ from "./pages/FAQ";
import Welcome from "./pages/Welcome";
import NewsfeedPage from "./pages/Newsfeed/components/NewsfeedPage";
import TermsOfService from "./pages/Legal/TermsOfService";
import EndUserLicenseAgreement from "./pages/Legal/EULA";
// import NewsfeedPage from './pages/Newsfeed/components/NewsfeedPage'

// Import apollo server
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable, split } from "apollo-link";

// Subscription connection
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// Google Analytics Imports
import ReactGA from "react-ga";

// Auth0 imports
import { useAuth0 } from "./config/react-auth0-spa";
import "./styles.css";

const trackingId = "UA-171530526-1";
ReactGA.initialize(trackingId);
const history = createHistory(window);

function App() {
  const { getIdTokenClaims } = useAuth0();
  const [authToken, setAuthToken] = useState();

  // Initialize google analytics page view tracking
  history.listen(window => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  const request = async operation => {
    const token = await getIdTokenClaims();
    setAuthToken(token.__raw);
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        Authorization: token.__raw,
      },
    }));
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => {
            request(oper);
          })
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

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: "same-origin",
  });

  let location = window.location,
    new_uri;
  location.protocol === "https:" ? (new_uri = "wss://") : (new_uri = "ws://");

  const wsLink = new WebSocketLink({
    uri: `${new_uri}${process.env.REACT_APP_WS_URL}`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: authToken,
      },
    },
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      requestLink,
      link,
    ]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <LocationProvider history={history}>
        <div className="App">
          <Router className="router">
            <Accessibility path="/accessibility" />
            <PrivacyPolicy path="/privacy-policy" />
            <PrivateRoute path="/" component={DashRouter}>
              <Welcome path="/" />
              <TermsOfService path="/tos" />
              <EndUserLicenseAgreement path="/eula" />
              <Settings path="/settings" />
              <AccountInfo path="updateaccount/:userEmail/*" />
              <UserProfile path="user/:userName" />
              <EventsCalendar path="calendar" />
              <ActivityList path="calendar/:eventId" />
              <MyEvents path="myevents" />
              <MyEventDetails path="myevents/:eventId" />
              <CreateEvent path="createEvent" />
              <EditEvent path="editEvent/:eventId" />
              <CreateActivity path="createEvent/:eventId" />
              <EditActivity path="editActivity/:activityId" />
              <ChatFeature path="chats" />
              <SponsorSpotlight path="/sponsorspotlight" />
              <AdminDashboard path="/adminDashboard" />
              <Announcement path="/announcements" />
              <FAQ path="/faqs" />
              <NewsfeedPage path="/community" />
            </PrivateRoute>
          </Router>
        </div>
      </LocationProvider>
    </ApolloProvider>
  );
}
export default App;
