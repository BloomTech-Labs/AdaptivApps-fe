import React, { Fragment } from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import config from "./auth/auth_config.json";

// example Profile page

const Profile = () => {
  const { loading, user } = useAuth0();

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <h3>{user[config.roleUrl]}</h3>
      <p>{user.email}</p>
      
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};

export default Profile;