// React/Reach Router imports
import React from "react";
import { Router } from "@reach/router";
// Apollo/GraphQL imports
import { useMutation } from "react-apollo";
import { UPDATE_USER_PROFILE } from "../queries";
// Component imports
import AccountTypeForm from "./AccountTypeForm";
import Step1 from "./Step1";
import OrgStep1 from "./OrgStep1";
import Step2 from "./Step2"
// Material-UI imports
import {
  makeStyles,
  Container,
  Typography,
  Box
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginLeft: "3rem",
    height: "100%"
  },
  headingBox: {
    margin: "6rem 0 2rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  children: {
    maxwidth: "100%",
    width: 744,
    height: "100%"
  },
});

export default function AccountInfo() {
  const classes = useStyles();
  const [UpdateProfile] = useMutation(UPDATE_USER_PROFILE);

  return (
    <Container className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1">Update Account Information</Typography>
      </Box>
    
      <Router className={classes.children}>
        <AccountTypeForm path="/" updateProfile={UpdateProfile} />
        <Step1 path="step1of6" updateProfile={UpdateProfile} />
        <OrgStep1 path="orginfo" updateProfile={UpdateProfile} />
        <Step2 path="step2of6" />
      </Router>
    </Container>
  );
}
