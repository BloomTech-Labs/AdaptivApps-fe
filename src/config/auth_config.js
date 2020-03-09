module.exports = {
  domain: process.env.REACT_APP_CLIENT_DOMAIN,
  clientId: process.env.REACT_APP_CLIENT_ID,
  roleUrl: 'http://adaptivapps.com/roles',
  audience: process.env.REACT_APP_AUDIENCE,
  responseType: 'token id_token',
  scope: 'openid email',
};
