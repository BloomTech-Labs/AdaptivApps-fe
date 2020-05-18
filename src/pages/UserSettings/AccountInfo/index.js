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
  Typography,
  Box
} from "@material-ui/core";

const useStyles = makeStyles({
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
});

export default function AccountInfo({children}) {
  const classes = useStyles();
  const [UpdateProfile] = useMutation(UPDATE_USER_PROFILE);

  return (
    <>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1">Update Account Information</Typography>
      </Box>
      <Box>
        {children}
      </Box>
      <Router>
        <AccountTypeForm path="/" updateProfile={UpdateProfile} />
        <Step1 path="step1of6" updateProfile={UpdateProfile} />
        <OrgStep1 path="org/step1of6" updateProfile={UpdateProfile} />
        <Step2 path="step2of6" />
      </Router>
    </>
  );
}
