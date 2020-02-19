import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import config from "./auth/auth_config.json";
import { Flex } from "adaptiv-ui"

// example Profile page

const Profile = () => {
  const { loading, user } = useAuth0();
  console.log(user)

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  } else
    return(
    user[config.roleUrl].includes("Admin") ?
      <Flex drape w='85vw'>
        <img src={user.picture} alt="Profile" />
        <h1>THIS IS ADMIN PAGE</h1>
        <h2>{user.name}</h2>
        <h3>{user[config.roleUrl]}</h3>
        <p>{user.email}</p>
      
        <code>{JSON.stringify(user, null, 2)}</code>
      </Flex>
      :
      <Flex drape w='85vw'>
        <img src={user.picture} alt="Profile" />
        <h1>THIS IS NON-ADMIN PAGE</h1>
        <h2>{user.name}</h2>
        <h3>{user[config.roleUrl]}</h3>
        <p>{user.email}</p>
        
        <code>{JSON.stringify(user, null, 2)}</code>
      </Flex>
  )
};

export default Profile;