// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "reach-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
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
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
      marginBottom: "2.4rem",
    },
  },
  shortSelect: {
    width: 360,
    marginRight: "2.4rem",
    marginBottom: "2.4rem",
  },
  longSelect: {
    marginBottom: "2.4rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "11.2rem",
  },
});

export default function Step3({ updateDemoProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    updateDemoProfile({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 3!!!!!</h1>
      <NextButton
        label="Next"
        type="submit"
        onClick={handleSubmit}
        ariaLabel="Click here to complete step 3 and move onto step 4 of account information update."
      />
    </form>
  );
}
