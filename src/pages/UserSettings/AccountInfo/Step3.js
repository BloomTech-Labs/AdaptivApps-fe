// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_5 } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  spacing: {
    marginTop: "2.4rem",
  },
  select: {
    width: 744,
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2.9rem",
  },
});

export default function Step5({ updateDemo2 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_5, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      veteranStatus: currentUserInfo && currentUserInfo.profile.demographicProfile.veteranStatus,
      militaryBranch: currentUserInfo && currentUserInfo.profile.demographicProfile.militaryBranch,
      yearsServed: currentUserInfo && currentUserInfo.profile.demographicProfile.yearsServed,
      ethnicity: currentUserInfo && currentUserInfo.profile.demographicProfile.ethnicity,
      householdIncome: currentUserInfo && currentUserInfo.profile.demographicProfile.householdIncome,
      employment: currentUserInfo && currentUserInfo.profile.demographicProfile.employment,
      favProAthletes: currentUserInfo && currentUserInfo.profile.demographicProfile.favProAthletes,
      favCelebs: currentUserInfo && currentUserInfo.profile.demographicProfile.favCelebs,
    }
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            veteranStatus: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.veteranStatus,
          },
          {
            militaryBranch: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.militaryBranch,
          },
          {
            yearsServed: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.yearsServed,
          },
          {
            ethnicity: currentUserInfo && currentUserInfo.profile.demographicProfile.ethnicity,
          },
          {
            householdIncome: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.householdIncome,
          },
          {
            employment: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.employment,
          },
          {
            favProAthletes: currentUserInfo && 
              currentUserInfo.profile.demographicProfile.favProAthletes,
          },
          {
            favCelebs: currentUserInfo && currentUserInfo.profile.demographicProfile.favCelebs,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  const onNext = handleSubmit(async data => {
    await updateDemo2({
      variables: {
        email: userEmail,
        veteranStatus: data.veteranStatus,
        militaryBranch: data.militaryBranch,
        yearsServed: data.yearsServed,
        ethnicity: data.ethnicity,
        householdIncome: data.householdIncome,
        employment: data.employment,
        favProAthletes: data.favProAthletes,
        favCelebs: data.favCelebs,
      },
    });

    alert("Successfully completed step 5 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step6of6`);
  });
  const onSave = handleSubmit(async data => {
    await updateDemo2({
      variables: {
        email: userEmail,
        veteranStatus: data.veteranStatus,
        militaryBranch: data.militaryBranch,
        yearsServed: data.yearsServed,
        ethnicity: data.ethnicity,
        householdIncome: data.householdIncome,
        employment: data.employment,
        favProAthletes: data.favProAthletes,
        favCelebs: data.favCelebs,
      },
    });

    alert("Successfully saved account info!");
    await navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={3} stepNumber={3} userEmail={userEmail} />
      <form className={classes.form}>
        <InputLabel htmlFor="veteranStatus">Are you a Veteran?</InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="veteranStatus"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="militaryBranch" className={classes.spacing}>
          Which branch of the military did you serve in?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Army">Army</MenuItem>
              <MenuItem value="Navy">Navy</MenuItem>
              <MenuItem value="Air Force">Air Force</MenuItem>
              <MenuItem value="Marine Corps">Marine Corps</MenuItem>
              <MenuItem value="Coast Guard">Coast Guard</MenuItem>
              <MenuItem value="Foreign Military">Foreign Military</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          }
          name="militaryBranch"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="yearsServed" className={classes.spacing}>
          How many years did you serve?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="yearsServed"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="ethnicity" className={classes.spacing}>
          Please enter your ethnicity
        </InputLabel>
        <Controller
          as={<TextField />}
          name="ethnicity"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="householdIncome" className={classes.spacing}>
          Please select your annual household income
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Less than $25,000">Less than $25,000</MenuItem>
              <MenuItem value="$25,000 to $49,999">$25,000 to $49,999</MenuItem>
              <MenuItem value="$50,000 to $99,999">$50,000 to $99,999</MenuItem>
              <MenuItem value="$100,000 to $199,999">
                $100,000 to $199,999
              </MenuItem>
              <MenuItem value="$200,000 or more">$200,000 or more</MenuItem>
            </Select>
          }
          name="householdIncome"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="employment" className={classes.spacing}>
          Are you currently employed?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="employment"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="favProAthletes" className={classes.spacing}>
          Who are your favorite professional athletes?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="favProAthletes"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="favCelebs" className={classes.spacing}>
          Who are your favorite celebrities?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="favCelebs"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            onClick={onSave}
            ariaLabel="Click to save and continue later and return to settings page."
          />
          <NextButton
            label="Next"
            onClick={onNext}
            ariaLabel="Click here to complete step 5 and move onto step 6 of account info update."
          />
        </Box>
      </form>
    </Box>
  );
}
