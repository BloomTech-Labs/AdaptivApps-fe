import React from 'react';
import ReactDom from 'react-dom';
// import { done } from '@testing-library/react';
import { asyncAuth } from '../config/react-auth0-spa'
import ProfileForm from '../pages/UserProfile/ProfileForm';
import { getByText } from '@testing-library/react';

test('renders app', async () => {
  const auth0 = await asyncAuth;
  if (auth0 === true) {
    const div = document.createElement('div');
    ReactDom.render(<ProfileForm />, div);
  }
});

test('renders first name field', async () => {
  const auth0 = await asyncAuth;
  if (auth0 === true) {
    ReactDom.render(<ProfileForm />)
    getByText(/there/i)
  }
})