import React, { useEffect } from 'react'
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useQuery, useMutation } from "react-apollo";
// import ProfileForm from "./ProfileForm";
import { ADD_USER_PROFILE, PROFILE_INFO } from "./queries";
// Material-UI imports
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3"
  },
});

export default function Settings() {
  const { user } = useAuth0();
  const classes = useStyles();

  const [createProfile] = useMutation(ADD_USER_PROFILE);

  // Fetch profile for the user using the email associated with auth0 login
  const { loading, error, data } = useQuery(PROFILE_INFO, {
    variables: { email: user && user.email },
  });
  const profile = data && data.profile;

  // Extract the profile from returning data of useQuery
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    // If user does not have a profile in backend, create one for them
    if (!loading && !profile) {
      newProfile();
    }
    // eslint-disable-next-line
  }, [profile]);

  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
  };

  return (
    <Box className={classes.headingBox} borderBottom={2}>
      <Typography variant="h1" gutterBottom>
        Account Settings
      </Typography>
    </Box>
    // <ProfileForm
    //   loading={loading}
    //   profile={profile ? profile : null}
    //   user={user}
    //   updateProfile={updateProfile}
    // />
  )
}
