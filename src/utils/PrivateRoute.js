import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth0 } from '../components/auth/react-auth0-spa'
import LandingPage from '../pages/LandingPage'
import { Wrapper } from 'adaptiv-ui'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user } = useAuth0()

  const render = props =>
    user ? (
      <Component {...props} />
    ) : !loading && !user ? (
      <LandingPage />
    ) : (
      <Wrapper jc_center>
        <h1>Loading</h1>
      </Wrapper>
    )

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
}
