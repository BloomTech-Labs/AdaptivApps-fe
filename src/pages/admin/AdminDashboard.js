import React from 'react';

//imports from auth0
import config from '../../components/auth/auth_config.json';

//imports from adaptive-ui
import { Box } from 'adaptiv-ui';

//imports from node_modules
import PropTypes from 'prop-types';

//Admin Dashboard 

function AdminDashboard({ user }) {
  return (
    <div>
      <Box w="10rem">
        <img src={user.picture} alt="Profile" />
      </Box>
      <h1>This is ADMIN PAGE</h1>
      <h2>{user.name}</h2>
      <h3>{user[config.roleUrl]}</h3>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </div>
  );
}

export default AdminDashboard;

AdminDashboard.propTypes = {
  user: PropTypes.object,
};
