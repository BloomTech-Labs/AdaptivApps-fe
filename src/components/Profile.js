import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import config from "./auth/auth_config.json";
import { Flex, Box } from "adaptiv-ui"

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
      <Flex ai_start col w='85vw'>
        <h2>Account Information</h2>
        <Box h='0.2rem' stretch bg='grey' />
        <Flex ai_center>
        <Box sqr='5rem' >
          <img src={user.picture} alt="Profile" />
        </Box>
        <h2>{user.name} ({user[config.roleUrl]})</h2>
        </Flex>
        <p>{user.email}</p>
      
        <code>{JSON.stringify(user, null, 2)}</code>
      </Flex>
      :
      <Flex drape w='85vw'>
        <img src={user.picture} alt="Profile" />
        <h2>{user.name} ({user[config.roleUrl]})</h2>
        <p>{user.email}</p>
        
        <code>{JSON.stringify(user, null, 2)}</code>
      </Flex>
  )
};

export default Profile;