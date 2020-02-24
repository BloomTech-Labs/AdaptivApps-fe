import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import * as auth0 from './components/auth/react-auth0-spa';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppWrapper } from 'adaptiv-ui';
import 'adaptiv-ui/css/main.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

//pointing apollo client to the apollo api.

const client = new ApolloClient({
  uri: 'http://localhost:8000',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: auth0,
      },
    }));
  },
});
//!!pointing apollo client to the apollo api.

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppWrapper bg="white">
      <App />
    </AppWrapper>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
