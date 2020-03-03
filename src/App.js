// React imports
import React from 'react';
// Reach Router imports
import { Router } from '@reach/router';
// Component imports
import DashRouter from './pages/DashRoute';
import PrivateRoute from './utils/PrivateRoute';
// Apollo imports
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
//Auth0 imports
import { useGetToken } from './components/auth/Auth';


function App() {
  const [token] = useGetToken();
  console.log('THE ONE TOKEN TO RULE THEM ALL!!!! ', token);
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
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
          <PrivateRoute exact path="/" component={DashRouter} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
