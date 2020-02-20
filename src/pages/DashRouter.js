// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../components/auth/react-auth0-spa';
import config from '../components/auth/auth_config.json';

// Component imports
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './users/UserDashboard';

const DashRouter = () => {
  const { loading, user } = useAuth0();
  console.log(user);

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return user[config.roleUrl].includes('Admin') ? (
    <div>
      <AdminDashboard user={user} />
    </div>
  ) : (
    <div>
      <UserDashboard user={user} />
    </div>
  );
};

export default DashRouter;
