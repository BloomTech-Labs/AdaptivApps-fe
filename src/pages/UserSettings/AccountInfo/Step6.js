// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import FinishButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

export default function Step6({ updateDemo3 }) {
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 6!!!!!</h1>
      <FinishButton
        type="submit"
        label="Finish"
        onClick={handleSubmit}
        ariaLabel="Click here to complete step 6 of account update and go back to account settings."
      />
    </form>
  );
}
