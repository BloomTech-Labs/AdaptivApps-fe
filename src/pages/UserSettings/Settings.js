// React/Reach Router imports
import React, { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";

import SponsorBanner from '../SponsorSpotlight/SponsorBanner'

const useStyles = makeStyles({
  root: {
    marginLeft: "3rem",
    //height: '100vh',
    wordWrap: 'normal',
    '& .MuiTableCell-root': {
       width: '50%',
       height: '10px',
       border: 'none'
    },
    '& .MuiTableRow-root': {
      lineHeight: '1%'
    }
  },
  headingBox: {
    margin: "6rem 0 2rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },

  nullInfoBox: {
    display: "flex",
    flexDirection: "column",
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
    marginTop: '5%',
    width: '40%',
    "& p": {
      fontSize: "1.8rem",
    },
  },
  nullProfileCta: {
    marginLeft: "0rem",
    "& p": {
      fontSize: "1.8rem",
    },
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
  subHeading: {
    marginBottom: "2.4rem",
    fontWeight: 550,
  },
  infoBox: {
    width: '55%'
  },
  flex: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  table: {
    marginTop: '5%',
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
    <>
    <div>
      <SponsorBanner />
    </div>
    <Box className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Account Settings
        </Typography>
      </Box>

      <Box className={classes.flex}>
       <Box className={ profile?.type === null ? classes.nullInfoBox : classes.infoBox}>
        <Typography variant="h2" className={classes.subHeading}>
          Account Information
        </Typography>
        {profile?.type === "Individual" ? (
          <>
          <TableContainer className={classes.table}>
          <Table aria-label='account information table' size='small'>
          <TableBody className={classes.tableBody}>
          <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Full name</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.firstName} {profile?.lastName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Username</Typography>
              </TableCell>
              <TableCell  align="left">
              <Typography>{profile?.userName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Phone</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.phoneNumber}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Email</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>City, State</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{profile?.city}, {profile?.state}</Typography>
              </TableCell>
            </TableRow>
          <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Birthday</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.birthday}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Gender</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.gender}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Emergency Contact</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.eC1Name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Relation</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.eC1Relation}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Phone</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{profile?.extProfile?.eC1Phone}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Disability Details</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{profile?.extProfile?.disability?.physicalDisability}</Typography>
              </TableCell>
            </TableRow>
          <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Veteran Status</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.demographicProfile?.veteranStatus}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Military Branch</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.demographicProfile?.militaryBranch}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Years Served</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.demographicProfile?.yearsServed}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Ethnicity</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.demographicProfile?.ethnicity}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box className={classes.displayBox}>
    <Typography>Display this info publicly?</Typography>
    <Checkbox color="primary" size="medium" />
    </Box> */}
          </>
        ) : profile?.type === "Organization" ? (
          <>
          <TableContainer className={classes.orgTable}>
          <Table aria-label='account information table' size='small'>
          <TableBody>
          <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Organization Name</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.orgName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Website</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.extProfile?.website}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Phone</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.phoneNumber}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>Email</Typography>
              </TableCell>
              <TableCell align="left">
              <Typography>{profile?.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              <Typography style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>City, State</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{profile?.city}, {profile?.state}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </>
      ) 
      : null }
      </Box>
      <Box
          className={
            profile?.type === null ? classes.nullProfileCta : classes.ctaBox
          }
        >
          <Typography>Help us bring you the best</Typography>
          <Typography>Angel City Sports experience--</Typography>
          <Typography>Tell us a bit more about yourself!</Typography>
          <Button
            className={classes.ctaBtn}
            aria-label="Click here to update account information."
            onClick={() => navigate(`/updateaccount/${userEmail}`)}
          >
            {profile?.firstName === null ? 'Add my info' : 'Edit my info'}
          </Button>
        </Box>
        </Box>
      </Box>
      </>  
  );
}

//Privacy toggle button for future use
{/* <Box className={classes.displayBox}>
    <Typography>Display this info publicly?</Typography>
    <Checkbox color="primary" size="medium" />
    </Box> */}

