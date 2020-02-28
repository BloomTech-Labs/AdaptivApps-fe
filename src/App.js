import React from 'react';
import { Router, Switch } from 'react-router-dom';

// Components
import DashRoute from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { useGetToken } from './components/auth/Auth';

// Auth0 imports
// import { Auth0Provider } from './components/auth/react-auth0-spa';
// import config from './components/auth/auth_config.json';
import history from './utils/History';

// Styling
import './App.css';

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
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={DashRoute} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
