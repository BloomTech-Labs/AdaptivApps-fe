import React from "react";
import config from "../../components/auth/auth_config.json";
import Profile from "./Profile";

function UserDashboard(props) {
  const { user } = props;
  return (
    <div>
      <img src={user.picture} alt="Profile" />
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
