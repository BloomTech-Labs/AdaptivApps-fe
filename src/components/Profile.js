import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import config from "./auth/auth_config.json";
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/users/UserDashboard';

const Profile = () => {
  const { loading, user } = useAuth0();

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    user[config.roleUrl].includes("Admin") ?
    <div>
        <AdminDashboard user={user} />
    </div> :
    <div>
        <UserDashboard user={user} />
    </div>
  );
};

export default Profile;