// Import dependencies
import React from 'react';
// Reach Router imports
import { Router, createHistory } from '@reach/router';

// Import components
import DashRouter from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';
import { useGetToken } from './components/auth/Auth';

// Import apollo server
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Google Analytics Imports
import ReactGA from 'react-ga';

function App() {
  // At app rendering, call useGetToken() to get token from auth0 login
  const [token] = useGetToken();
  console.log('Token: ', token);

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

const trackingId = "UA-159556430-1";
const history = createHistory(window);

ReactGA.initialize(trackingId);
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router history={history}>
          <PrivateRoute exact path="/" component={DashRouter} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
