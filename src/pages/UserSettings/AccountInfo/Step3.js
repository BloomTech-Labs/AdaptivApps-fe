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
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  form: {
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
  textBox: {
    marginBottom: 240,
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function Step3({ updateDemoProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    await updateDemoProfile({
      variables: {
        email: userEmail,
        adaptivSportsParticipation: data.adaptivSportsParticipation,
        acsParticipation: data.acsParticipation,
        notParticipating: data.notParticipating,
        angelCityParticipation: data.angelCityParticipation,
      },
    });
    alert("Successfully completed step 3 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step4of6`);
  };

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={3} stepNumber={3} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="adaptivSportsParticipation">
          Have you ever participated in adaptive sports before?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="adaptivSportsParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel className={classes.spacing} htmlFor="acsParticipation">
          Have you participated in Angel City Clinics before?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="acsParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel
          className={classes.spacing}
          htmlFor="angelCityParticipation"
        >
          Please select all Angel City Games you have participated in?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Game 1">Game 1</MenuItem>
              <MenuItem value="Game 2">Game 2</MenuItem>
              <MenuItem value="Game 3">Game 3</MenuItem>
            </Select>
          }
          name="angelCityParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel className={classes.spacing} htmlFor="notParticipating">
          If you are not participating in as many adaptive sports as you'd like,
          can you please share why?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="notParticipating"
          variant="outlined"
          control={control}
          className={classes.textBox}
          multiline
          rows="8"
          defaultValue=""
        />
        <Box className={classes.btnBox}>
          <NextButton
            label="Next"
            type="submit"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 3 and move onto step 4 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
