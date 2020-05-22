// React/Reach Router imports
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
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
  }
})

export default function Step5({ updateDemo2 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();
  
  const onSubmit = async data => {
    updateDemo2({
      variables: {
        email: userEmail,
      }
    })
    alert("Successfully completed step 5 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step6of6`);
  }

  return (
    <form>
      <h1>Step 5!!!!</h1>
    </form>
  )
}
