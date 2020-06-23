// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_3 } from "../queries";
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
  em: {
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2.9rem",
  },
});

export default function Step5({ updateDemoProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_3, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      veteranStatus:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.veteranStatus,
      militaryBranch:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.militaryBranch,
      yearsServed:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.yearsServed,
      ethnicity:
        currentUserInfo && currentUserInfo.profile.demographicProfile.ethnicity,
      householdIncome:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.householdIncome,
      employment:
        currentUserInfo &&
        currentUserInfo.profile.demographicProfile.employment,
      covid:
        currentUserInfo && currentUserInfo.profile.demographicProfile.covid,
      citizen:
        currentUserInfo && currentUserInfo.profile.demographicProfile.citizen,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            veteranStatus:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.veteranStatus,
          },
          {
            militaryBranch:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.militaryBranch,
          },
          {
            yearsServed:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.yearsServed,
          },
          {
            ethnicity:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.ethnicity,
          },
          {
            householdIncome:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.householdIncome,
          },
          {
            employment:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.employment,
          },
          {
            covid:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.covid,
          },
          {
            citizen:
              currentUserInfo &&
              currentUserInfo.profile.demographicProfile.citizen,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  const onNext = handleSubmit(async data => {
    await updateDemoProfile({
      variables: {
        email: userEmail,
        veteranStatus: data.veteranStatus,
        militaryBranch: data.militaryBranch,
        yearsServed: data.yearsServed,
        ethnicity: data.ethnicity,
        householdIncome: data.householdIncome,
        employment: data.employment,
        covid: data.covid,
        citizen: data.citizen,
      },
    });

    alert("Successfully completed step 3 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step4of6`);
  });
  const onSave = handleSubmit(async data => {
    await updateDemoProfile({
      variables: {
        email: userEmail,
        veteranStatus: data.veteranStatus,
        militaryBranch: data.militaryBranch,
        yearsServed: data.yearsServed,
        ethnicity: data.ethnicity,
        householdIncome: data.householdIncome,
        employment: data.employment,
        covid: data.covid,
        citizen: data.citizen,
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
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
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
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
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
          Please select your ethnicity
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Hispanic or Latino">Hispanic or Latino</MenuItem>
              <MenuItem value="American Indian/Alaskan Native">American Indian/Alaskan Native</MenuItem>
              <MenuItem value="Asian">Asian</MenuItem>
              <MenuItem value="Black or African American">Black or African American</MenuItem>
              <MenuItem value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Two or More Races (Multi-Racial Individuals)">Two or More Races (Multi-Racial Individuals)</MenuItem>
              <MenuItem value="Prefer not to answer">Prefer not to answer</MenuItem>
            </Select>
          }
          name="ethnicity"
          type="select"
          className={classes.select}
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
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
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
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
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
        <InputLabel htmlFor="covid" className={classes.spacing}>
          Did your employment status change due to COVID-19?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="covid"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="citizen" className={classes.spacing}>
          Are you a U.S. citizen?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="citizen"
          type="select"
          className={classes.select}
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
            ariaLabel="Click here to complete step 3 and move onto step 4 of account info update."
          />
        </Box>
      </form>
    </Box>
  );
}
