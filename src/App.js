import React from 'react';
import { Router, Switch } from 'react-router-dom';

// Components
import DashRouter from './pages/DashRouter';
import PrivateRoute from './utils/PrivateRoute';

//imports from Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


// Auth0 imports
import { useGetToken } from './components/auth/Auth';
import history from './utils/History';

// Styling
import './App.css';

function App() {
  const [token] = useGetToken();
  const client = new ApolloClient({
    uri: 'http://localhost:8000',
    request: operation => {
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          authorization: token,
        },
      }));
    },
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={DashRouter} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
