import React from 'react';
import config from '../../components/auth/auth_config.json';
import { Box } from 'adaptiv-ui';
import PropTypes from 'prop-types';

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
    </div>
  );
}

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
