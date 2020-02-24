import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import auth from './components/auth/Auth';
import { ApolloProvider } from '@apollo/react-hooks';
import { Auth0Provider } from './components/auth/react-auth0-spa';
import config from './components/auth/auth_config.json';
import { AppWrapper } from 'adaptiv-ui';
import 'adaptiv-ui/css/main.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

//pointing apollo client to the apollo api.

// console.log('all exports from react-auth0-rsa', auth0);
const client = new ApolloClient({
  uri: 'http://localhost:8000',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: auth.getIdToken(),
      },
    }));
  },
});

//!!pointing apollo client to the apollo api.

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    responseType={config.responseType}
    scope={window.scope}
  >
    <ApolloProvider client={client}>
      <AppWrapper bg="white">
        <App />
      </AppWrapper>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
