import React from 'react';

//imports from auth0
import config from '../../components/auth/auth_config.json';

//imports from adaptiv-ui
import { Box } from 'adaptiv-ui';

//imports from node_modules
import PropTypes from 'prop-types';

//imports from components
import Profile from './Profile'

//User Dashboard Information

function UserDashboard({ user }) {
  return (
    <div>
      <Box w="10rem">
        <img src={user.picture} alt="Profile" />
      </Box>
      <h1>This is USER </h1>
      <h2>{user.name}</h2>
      <h3>{user[config.roleUrl]}</h3>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      <Profile />
    </div>
  );
}

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
