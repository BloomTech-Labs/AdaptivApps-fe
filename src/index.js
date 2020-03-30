// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// import { AppWrapper } from 'adaptiv-ui';

// Import project configurations from local files
import { Auth0Provider } from './config/react-auth0-spa';
import config from './config/auth_config';
import 'adaptiv-ui/css/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // Wrap project in auth0 for authentication and authorization
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    responseType={config.responseType}
    scope={config.scope}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
