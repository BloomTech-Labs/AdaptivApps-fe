// React/Reach Router imports
import React from "react";
import { Router } from "@reach/router";
// Apollo/GraphQL imports
import { useMutation } from "react-apollo";
import { UPDATE_USER_PROFILE } from "../queries";
import { UPDATE_ORG_PROFILE } from "../queries";
import { UPDATE_EXT_PROFILE } from "../queries";
import { UPDATE_DEMO_PROFILE } from "../queries"
import { UPDATE_SPORTS_DEMO } from "../queries"
// Component imports
import AccountTypeForm from "./AccountTypeForm";
import OrgStep1 from "./OrgStep1";
import Step1 from "./Step1";
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"
import Step5 from "./Step5"
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
  const [UpdateOrgProfile] = useMutation(UPDATE_ORG_PROFILE);
  const [UpdateExtProfile] = useMutation(UPDATE_EXT_PROFILE);
  const [UpdateDemoProfile] = useMutation(UPDATE_DEMO_PROFILE);
  const [UpdateSportsDemo] = useMutation(UPDATE_SPORTS_DEMO);

  return (
    <Container className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1">Update Account Information</Typography>
      </Box>
    
      <Router className={classes.children}>
        <AccountTypeForm path="/" updateProfile={UpdateProfile} />
        <OrgStep1 path="orginfo" updateOrgProfile={UpdateOrgProfile} />
        <Step1 path="step1of6" updateProfile={UpdateProfile} />
        <Step2 path="step2of6" updateExtProfile={UpdateExtProfile}/>
        <Step3 path="step3of6" updateDemoProfile={UpdateDemoProfile}/>
        <Step4 path="step4of6" updateSportsDemo={UpdateSportsDemo}/>
        <Step5 path="step5of6" updateProfile={UpdateDemoProfile}/>
      </Router>
    </Container>
  );
}
