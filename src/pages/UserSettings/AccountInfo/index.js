// React/Reach Router imports
import React from "react";
import { Router } from "@reach/router";
// Auth0 imports
import { useAuth0 } from "../../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useMutation } from "react-apollo";
import { UPDATE_TYPE_ROLE } from "../queries";
import { UPDATE_USER_PROFILE } from "../queries";
import { UPDATE_ORG_PROFILE } from "../queries";
import { UPDATE_EXT_PROFILE } from "../queries";
import { UPDATE_DEMO_PROFILE } from "../queries";
import { UPDATE_DEMO_2 } from "../queries";
import { UPDATE_DEMO_3 } from "../queries";
import { UPDATE_DEMO_4 } from "../queries";
// Component imports
import AccountTypeForm from "./AccountTypeForm";
import OrgStep1 from "./OrgStep1";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
// Material-UI imports
import { makeStyles, Container, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    margin: "0",
    "& .MuiTypography-h1": {
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0rem",
        fontSize: "2.75rem",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0rem",
        fontSize: "2.30rem",
      },
    },
  },
  headingBox: {
    margin: "6rem 0 0.7rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "6rem auto 3rem auto",
    },
  },

  children: {
    maxwidth: "100%",
    width: "90%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },
}));

export default function AccountInfo() {
  const classes = useStyles();
  const { user } = useAuth0();
  const [UpdateTypeRole] = useMutation(UPDATE_TYPE_ROLE);
  const [UpdateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [UpdateOrgProfile] = useMutation(UPDATE_ORG_PROFILE);
  const [UpdateExtProfile] = useMutation(UPDATE_EXT_PROFILE);
  const [UpdateDemoProfile] = useMutation(UPDATE_DEMO_PROFILE);
  const [UpdateDemo2] = useMutation(UPDATE_DEMO_2);
  const [UpdateDemo3] = useMutation(UPDATE_DEMO_3);
  const [UpdateDemo4] = useMutation(UPDATE_DEMO_4);

  return (
    <Container className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1">
          Update Account Information
        </Typography>
      </Box>

      <Router className={classes.children}>
        <AccountTypeForm path="/" updateProfile={UpdateTypeRole} />
        <OrgStep1 path="organizationInfo" updateOrgProfile={UpdateOrgProfile} />
        <Step1 path="individualInfo" updateProfile={UpdateProfile} />
        <Step2 path="step2of6" updateExtProfile={UpdateExtProfile} />
        <Step3 path="step3of6" updateDemoProfile={UpdateDemoProfile} />
        <Step4 path="step4of6" updateDemo2={UpdateDemo2} />
        <Step5 path="step5of6" updateDemo3={UpdateDemo3} />
        <Step6 path="step6of6" updateDemo4={UpdateDemo4} />
      </Router>
    </Container>
  );
}
