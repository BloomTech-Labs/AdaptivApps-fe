import React from 'react'
import { render as rtlRender, fireEvent, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useAuth0 } from '../config/react-auth0-spa'
import NavBar from '../pages/Landing/NavBar'
import App from '../App';
import { Auth0Provider } from '../config/react-auth0-spa'

afterEach(cleanup)
const mockAuthProps = {
  domain: process.env.REACT_APP_CLIENT_DOMAIN,
  clientId: process.env.REACT_APP_CLIENT_ID,
  // roleUrl: 'http://adaptivapps.com/roles',
  redirect_uri: window.location.origin,
  audience: process.env.REACT_APP_AUDIENCE,
  responseType: 'token id_token',
  scope: 'openid email',
}

function render(
  uiElement, authProps) {
    function Wrapper(props){
      return <Auth0Provider {...authProps} {...props} />
    }
  return rtlRender(uiElement, {wrapper: Wrapper})
}

test("should have button labeled log in", () => {
  const { getByText } = render(<NavBar />, mockAuthProps)
  expect(getByText(/log in/i)).not.toBe(null)
})