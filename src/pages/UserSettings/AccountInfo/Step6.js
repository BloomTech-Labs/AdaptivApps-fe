// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_6 } from "../queries";
// Component imports
import FinishButton from "../../../theme/SmallFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  TextField,
  Typography,
  Checkbox
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    
  },
  spacing: {
    marginTop: "1.6rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "2.9rem",
  },
});

export default function Step6({ updateDemo4 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_6, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      becomeAthleteMentor:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.becomeAthleteMentor,
      athleteMentorHelp:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.athleteMentorHelp,
      athleteMentorSport:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.athleteMentorSport,
      acsDiscovery:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.acsDiscovery,
      acsOrgSpecificDiscovery:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.acsOrgSpecificDiscovery,
      amplaEmail:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.amplaEmail,
      hangerClinic:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.hangerClinic,
      challengeMagazine:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.challengeMagazine,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            becomeAthleteMentor:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.becomeAthleteMentor,
          },
          {
            athleteMentorHelp:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.athleteMentorHelp,
          },
          {
            athleteMentorSport:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.athleteMentorSport,
          },
          {
            acsDiscovery:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.acsDiscovery,
          },
          {
            acsOrgSpecificDiscovery:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile
                .acsOrgSpecificDiscovery,
          },
          {
            amplaEmail:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.amplaEmail,
          },
          {
            hangerClinic:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.hangerClinic,
          },
          {
            challengeMagazine:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.challengeMagazine,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  const onSubmit = async data => {
    await updateDemo4({
      variables: {
        email: userEmail,
        becomeAthleteMentor: data.becomeAthleteMentor,
        athleteMentorHelp: data.athleteMentorHelp,
        athleteMentorSport: data.athleteMentorSport,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        amplaEmail: data.amplaEmail,
        hangerClinic: data.hangerClinic,
        challengeMagazine: data.challengeMagazine,
      },
    });
    alert("Successfully updated all required account information!");
    await navigate(`/`);
  };
  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={6} stepNumber={6} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="additionalInfo">
          Is there anything you would like the Angel City team to know in preparation for the 2020 Angel City Virtual Games?
        </InputLabel>
        <Controller
          as={
            <TextField />
          }
          name="additionalInfo"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="waiverSignature">
          Please sign by typing your name below
        </InputLabel>
        <Controller
          as={
            <TextField />
          }
          name="waiverSignature"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="minorName">
          Minor participant's name
        </InputLabel>
        <Controller
          as={
            <TextField />
          }
          name="minorName"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
      
        <Box className={classes.btnBox}>
          <FinishButton
            type="submit"
            label="Finish"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 6 of account update and go back to account settings."
          />
        </Box>
      </form>
    </Box>
  );
}
