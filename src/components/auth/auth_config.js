module.exports = {
  domain: 'dev-sxhevmag.auth0.com',
  clientId: process.env.REACT_APP_CLIENT_ID,
  roleUrl: 'http://adaptivapps.com/roles',
  audience: 'https://dev-sxhevmag.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid email',
};
