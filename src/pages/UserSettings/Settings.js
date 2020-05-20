// React/Reach Router imports
import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useQuery, useMutation } from "react-apollo";
// import ProfileForm from "./ProfileForm";
import { ADD_USER_PROFILE, PROFILE_INFO } from "./queries";
// Material-UI imports
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  ctaBox: {},
  ctaBtn: {
    textTransform: "none",
    marginTop: "2.4rem",
    background: "#2962FF",
    color: "#FFFFFF",
    width: 360,
    height: 48,
    "& .MuiButton-label": {
      fontSize: "2.1rem",
      fontWeight: 550,
    },
    "&:hover": {
      border: "1px solid #2962FF",
      background: "white",
      color: "#2962FF",
    },
  },
});

export default function Settings() {
  const { user } = useAuth0();
  const classes = useStyles();
  const navigate = useNavigate();
  const userEmail = user.email;

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
    <Container>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Account Settings
        </Typography>
      </Box>
      <Box className={classes.ctaBox}>
        <Typography>Help us bring you the best</Typography>
        <Typography>Angel City Sports experience--</Typography>
        <Typography>Tell us a bit more about yourself!</Typography>
        <Button
          className={classes.ctaBtn}
          aria-label="Click here to update account information."
          onClick={() => navigate(`/updateaccount/${userEmail}`)}
        >
          Add my info
        </Button>
      </Box>
    </Container>
  );
}
