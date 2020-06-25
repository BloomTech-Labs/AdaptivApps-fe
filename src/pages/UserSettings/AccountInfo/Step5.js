// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";

// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  Typography,
  Checkbox,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  checkBoxContainer: {
    display: "flex",
    width: "100%",
    marginTop: "2.7rem",
  },
  boxSpacing: {
    width: "100%",
  },
  checkbox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    width: "70%",
  },
  check: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "6.9rem",
  },
});

export default function Step4({ updateDemo3 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, control } = useForm();

  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateDemo3({
      variables: {
        email: userEmail,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        acsParticipation: data.acsParticipation,
        amplaEmail: data.amplaEmail,
        virtualRide: data.virtualRide,
        virtualRidePlatforms: data.virtualRidePlatforms,
        xBoxGamePass: data.xBoxGamePass,
        videoGameFamiliarity: data.videoGameFamiliarity,
      },
    });
    alert("Successfully completed step 5 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step6of6`);
  });

  const onSave = handleSubmit(async data => {
    await updateDemo3({
      variables: {
        email: userEmail,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        acsParticipation: data.acsParticipation,
        amplaEmail: data.amplaEmail,
        virtualRide: data.virtualRide,
        virtualRidePlatforms: data.virtualRidePlatforms,
        xBoxGamePass: data.xBoxGamePass,
        videoGameFamiliarity: data.videoGameFamiliarity,
        
      },
    });
    alert("Successfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={5} stepNumber={5} userEmail={userEmail} />
      <form className={classes.form}>
       
       
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            ariaLabel="Click to save and continue later and return to settings page."
            onClick={onSave}
          />
          <NextButton
            label={"Next"}
            onClick={onNext}
            ariaLabel="Click here to complete step 5 and move onto step 6 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
