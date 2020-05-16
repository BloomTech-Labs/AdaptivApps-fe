// React/Reach Router imports
import React from "react";
import { useNavigate } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Component imports
import NextButton from "../../../theme/NextButton";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Container,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  typeSelect: {
    width: 744,
    height: 48
  }
})

export default function AccountTypeForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, errors, control } = useForm({});
  return (
    <Container>
      <form>
        <InputLabel>
          Are you registering as an individual or an organization?
        </InputLabel>
        <Controller
          as={
            <Select className={classes.typeSelect}>
              <MenuItem value="Individual">I'm registering as an individual</MenuItem>
              <MenuItem value="Organization">I'm registering as an organization</MenuItem>
            </Select>
          }
          name="type"
          variant="outlined"
          control={control}
        />
      </form>

      <NextButton
        ariaLabel="Click here to complete step 1 of update account information."
        onClick={() => navigate("/updateaccount/step1")}
      />
    </Container>
  );
}
