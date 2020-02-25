import React from 'react';
import ReactDOM from 'react-dom';

// imports from auth0
import { Auth0Provider } from './components/auth/react-auth0-spa';
import config from './components/auth/auth_config.json';

//imports from adaptive-ui
import { AppWrapper } from 'adaptiv-ui';
import 'adaptiv-ui/css/main.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

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
    <AppWrapper bg="white">
      <App />
    </AppWrapper>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
