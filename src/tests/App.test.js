import React from 'react';
import ReactDom from 'react-dom';
// import { done } from '@testing-library/react';
import { asyncAuth } from '../config/react-auth0-spa'
import App from '../App';

test('renders app', async () => {
  const auth0 = await asyncAuth;
  if (auth0 === true) {
    const div = document.createElement('div');
    ReactDom.render(<App />, div);
  }
});