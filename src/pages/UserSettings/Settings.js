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
  Box,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginLeft: '3rem'
  },
  headingBox: {
    margin: "6rem 0 2rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  subHeading: {
    marginBottom: "2.4rem",
    fontWeight: 550,
  },
  infoBox: {
    display: "flex",
  },
  acctInfoBox: {
    width: "30%",
  },
  dataContainer: {
    display: "flex",
  },
  dataBox: {
    display: "flex",
    minWidth: "45%",
    flexDirection: "column",

    "& p": {
      fontWeight: 550,
      lineHeight: "3rem",
    },
  },
  data: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    "& p": {
      lineHeight: "3rem",
    },
  },
  displayBox: {
    display: "flex",
    marginBottom: 40,
    "& p": {
      fontWeight: "bold",
      lineHeight: "3rem",
    },
  },
  ctaBox: {
    marginLeft: "9.9rem",
    marginTop: '4.8rem',
    '& p': {

      fontSize: '1.8rem'
    }
  },
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
  disabilityBox: {
    border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    "& :nth-child(1)": {
      fontWeight: 500,
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
  const { loading, error, data, refetch } = useQuery(PROFILE_INFO, {
    variables: { email: user?.email },
  });
 
  const profile = data?.profile;
 
  // Extract the profile from returning data of useQuery
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    // If user does not have a profile in backend, create one for them
    if (!loading && !profile?.id) {
      newProfile();
    }

    if (profile) {
      refetch();
    }
    // eslint-disable-next-line
  }, [profile]);

  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: user.email } });
    refetch();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Account Settings
        </Typography>
      </Box>
      <Box className={classes.infoBox}>
        <Box className={classes.acctInfoBox}>
          <Typography variant="h2" className={classes.subHeading}>
            Account Information
          </Typography>
          <Box className={classes.dataContainer}>
            <Box className={classes.dataBox}>
              <Typography>Full name</Typography>
              <Typography>Username</Typography>
              <Typography>Phone</Typography>
              <Typography>Email</Typography>
              <Typography>City, State</Typography>
            </Box>
            <Box className={classes.data}>
              <Typography>
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography>{profile?.displayName}</Typography>
              <Typography>{profile?.phoneNumber}</Typography>
              <Typography>{profile?.email}</Typography>
              <Typography>
                {profile?.city}, {profile?.state}
              </Typography>
            </Box>
          </Box>
          {/* Display option will be a feature in  */}
          <Box className={classes.displayBox}>
            {/* <Typography>Display this info publicly?</Typography>
            <Checkbox color="primary" size="medium" /> */}
          </Box>

          <Box className={classes.dataContainer}>
            <Box className={classes.dataBox}>
              <Typography>Birthday</Typography>
              <Typography>Gender</Typography>
              <Typography>Emergency contact</Typography>
              <Typography>Relation</Typography>
              <Typography>Phone</Typography>
              <Typography>Disability details</Typography>
            </Box>
            <Box className={classes.data}>
              <Typography>{profile?.extProfile?.birthday}</Typography>
              <Typography>{profile?.extProfile?.gender}</Typography>
              <Typography>{profile?.extProfile?.eC1Name}</Typography>
              <Typography>{profile?.extProfile?.eC1Relation}</Typography>
              <Typography>{profile?.extProfile?.eC1Phone}</Typography>
              <Typography>
                {profile?.extProfile?.disability?.physicalDisability}
              </Typography>
            </Box>
          </Box>
          {/* Display option will be a feature in  */}
          <Box className={classes.displayBox}>
            {/* <Typography>Display this info publicly?</Typography>
            <Checkbox color="primary" size="medium" /> */}
          </Box>
          <Box className={classes.dataContainer}>
            <Box className={classes.dataBox}>
              <Typography>Veteran Status</Typography>
              <Typography>Military Branch</Typography>
              <Typography>Years Served</Typography>
              <Typography>Ethnicity</Typography>
            </Box>
            <Box className={classes.data}>
              <Typography>
                {profile?.demographicProfile?.veteranStatus}
              </Typography>
              <Typography>
                {profile?.demographicProfile?.militaryBranch}
              </Typography>
              <Typography>
                {profile?.demographicProfile?.yearsServed}
              </Typography>
              <Typography>{profile?.demographicProfile?.ethnicity}</Typography>
            </Box>
          </Box>
            {/* Display option will be a feature in  */}
          {/* <Box className={classes.displayBox}>
            <Typography>Display this info publicly?</Typography>
            <Checkbox color="primary" size="medium" />
          </Box> */}
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
      </Box>
    </Box>
  );
}
