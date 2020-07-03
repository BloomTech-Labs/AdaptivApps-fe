// React/Reach Router imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_INFO } from "./queries";

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

import SponsorBanner from "../SponsorSpotlight/SponsorBanner";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "3rem",
    //height: '100vh',
    width: "67.5%",
    wordWrap: "normal",
    "& .MuiTableCell-root": {
      width: "100%",
      border: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "0 auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },

  nullInfoBox: {
    display: "none",
    flexDirection: "column",
  },
  // data: {
  //   textAlign: "left",
  //   display: "flex",
  //   flexDirection: "column",
  //   "& p": {
  //     lineHeight: "3rem",
  //   },
  // },
  displayBox: {
    display: "flex",
    marginBottom: 40,
    "& p": {
      fontWeight: "bold",
      lineHeight: "3rem",
    },
  },
  ctaBox: {
    marginTop: "8%",
    width: "40%",
    "& p": {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      margin: "8% 0",
    },
    [theme.breakpoints.down("ix")]: {
      width: "100%",
      margin: "8% 0",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "8% 0",
    },
  },
  nullProfileCta: {
    width: "100%",
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
    width: "36rem",
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
    [theme.breakpoints.down("sm")]: {
      width: "28rem",
      margin: "2rem auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "2rem auto",
    },
  },
  subHeading: {
    marginBottom: "2.4rem",
    fontWeight: 550,
  },
  infoBox: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "auto",
    },
  },
  flex: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
      margin: "auto",
    },
  },
  table: {
    marginTop: "5%",
  },
  tableBody: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      margin: "auto",
    },
  },
  mobileFlex: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: ".25rem 0",
    lineHeight: "10px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    "& .MuiTableCell-sizeSmall": {
      paddingLeft: "0",
    },
  },
  emailNotice: {
    fontSize: "1.2rem",
  },
}));

export default function Settings() {
  const { user } = useAuth0();
  const classes = useStyles();
  const navigate = useNavigate();
  const userEmail = user.email;

  // Fetch profile for the user using the email associated with auth0 login
  const { loading, error, data, refetch } = useQuery(PROFILE_INFO, {
    variables: { email: user?.email },
  });

  const profile = data?.profile;

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
          <Box
            className={
              profile?.type === null ? classes.nullInfoBox : classes.infoBox
            }
          >
            <Typography variant="h2" className={classes.subHeading}>
              Account Information
            </Typography>
            {profile?.type === "Individual" ? (
              <>
                <TableContainer tabIndex="0" className={classes.table}>
                  <Table aria-label="account information table" size="small">
                    <TableBody className={classes.tableBody}>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Full name
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.firstName} {profile?.lastName}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Username
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.userName}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Phone Number
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.phoneNumber}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Email
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.email}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              City, State
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.city}, {profile?.state}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Birthday
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.extProfile?.birthday}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Gender
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.extProfile?.gender}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Emergency Contact
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.extProfile?.eC1Name}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Relation
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.extProfile?.eC1Relation}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Phone
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.extProfile?.eC1Phone}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Disability Details
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {
                                profile?.extProfile?.disability
                                  ?.physicalDisability
                              }
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Veteran Status
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.demographicProfile?.veteranStatus}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Military Branch
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.demographicProfile?.militaryBranch}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Years Served
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.demographicProfile?.yearsServed}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
                      {/* <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Ethnicity
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography>
                              {profile?.demographicProfile?.ethnicity}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow> */}
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
                <TableContainer className={classes.table}>
                  <Table
                    aria-label="account information table"
                    size="small"
                    tabIndex="0"
                  >
                    <TableBody className={classes.tableBody}>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Organization Name
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.extProfile?.orgName}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Website
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.extProfile?.website}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Phone Number
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.phoneNumber}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      <TableRow>
                        <div className={classes.mobileFlex}>
                          <TableCell component="th" scope="row" tabIndex="0">
                            <Typography
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.6rem",
                                height: "15px",
                              }}
                            >
                              Email
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography tabIndex="0">
                              {profile?.email}
                            </Typography>
                          </TableCell>
                        </div>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.6rem",
                              height: "15px",
                            }}
                          >
                            City, State
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography>
                            {profile?.city}, {profile?.state}
                          </Typography>
                        </TableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : null}
          </Box>
          <Box
           
            className={
              profile?.type === null ? classes.nullProfileCta : classes.ctaBox
            }
          >
            <Typography>
              Help us bring you the best
              </Typography>
              <Typography>
              Angel City Sports experience--
              </Typography>
              <Typography>
              Tell us a bit more about yourself!
            </Typography>
          
            <Button
              className={classes.ctaBtn}
              aria-label="Click here to update account information."
              onClick={() => navigate(`/updateaccount/${userEmail}`)}
            >
              {profile?.type === null ? "Add my info" : "Edit my info"}
            </Button>
          </Box>
        </Box>
        <p className={classes.emailNotice}>
          *Don't forget to check your email with updates from Angel City Sports!
        </p>
      </Box>
    </>
  );
}

//Privacy toggle button for future use
{
  /* <Box className={classes.displayBox}>
    <Typography>Display this info publicly?</Typography>
    <Checkbox color="primary" size="medium" />
    </Box> */
}
