// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
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
    width: "80%",
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
    justifyContent: "flex-end",
    marginTop: "2.9rem",
  },
});

export default function Step5({ updateDemo2 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
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
  };

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={5} stepNumber={5} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          <NextButton
            label="Next"
            type="submit"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 5 and move onto step 6 of account info update."
          />
        </Box>
      </form>
    </Box>
  );
}
