import auth0 from 'auth0-js';
import axios from 'axios';
import request from 'request';
// import auth0FromHook from './react-auth0-spa';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-sxhevmag.auth0.com',
      clientID: 'asVyDNwKxm5ysKPmQ0cwhzLzT3WShqO0',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://dev-sxhevmag.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    var options = {
      method: 'POST',
      url: 'https://dev-sxhevmag.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body:
        '{"client_id":"28y6dQAMR82ncLU2Tg4mYZZfqXMrTsXG","client_secret":"agpZ_5c9Of1Jan77BDgRcogfNFEGqkLN4xRCTUnmuvqsizJKFSoiZZV1E7grxlcm","audience":"https://dev-sxhevmag.auth0.com/userinfo","grant_type":"client_credentials"}',
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      console.log('body', body);
      console.log('response', response);
    });
    // const data = JSON.parse(process.env.REACT_APP_DATA);
    // const headers = {
    //   'Content-Type': 'application/json',
    // };
    // axios
    //   .post('https://dev-sxhevmag.auth0.com/oauth/token', headers, data)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    // this.idToken =
    //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJURTJNVE5GT1VRMU5URTFNemN4TWpFMFJVWXlNekl6TkRaRk5qSkRSRU00UmtNd1JUY3pNZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1zeGhldm1hZy5hdXRoMC5jb20vIiwic3ViIjoiMjh5NmRRQU1SODJuY0xVMlRnNG1ZWlpmcVhNclRzWEdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXN4aGV2bWFnLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgyNTgxMTI4LCJleHAiOjE1ODI2Njc1MjgsImF6cCI6IjI4eTZkUUFNUjgybmNMVTJUZzRtWVpaZnFYTXJUc1hHIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.LvD7hI8zVlTrF0yRE9zLtpueY-rZvA5RwQcRXRwcsrDwk4Ze7BXvaRd9woh0tOpgfnhzUkXXH2sKNb3bAQm4zpnVvS-jOq1M3ve1H9ms2GRPS75XEddW3WxIIPaEAjCwOUNzZuoxwZP12A62epcVimi4lprakaW5JyfD2WeZxZeC3wz6OOAaj3U_VsE3D__z4KoxbKK3U_5d8L5f77cwaknm6GfUyzWGIuGh_IbJuoYrwnng-MbeYTookPIEsaNJJwUIKOR3yDUV01JLXDJrcJOBH2ujpKZpfNZMDZcBo-Sr-tD_WTvMcE6sir45SsCpvmRhNeKg4KgqCih4RhKnGA';
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    console.log(this.idToken);
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'asVyDNwKxm5ysKPmQ0cwhzLzT3WShqO0',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;
