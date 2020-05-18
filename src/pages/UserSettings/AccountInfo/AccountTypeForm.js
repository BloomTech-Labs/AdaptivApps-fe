// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Apollo/GraphQL imports
import { useMutation } from "react-apollo";
import { UPDATE_USER_PROFILE } from "../queries";
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
    height: 48,
  },
});

export default function AccountTypeForm({ user }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { handleSubmit, errors, control } = useForm();

  const [UpdateProfile] = useMutation(UPDATE_USER_PROFILE);

  const onSubmit = async (data) => {
    UpdateProfile({
      variables: {
        type: data.type,
        email: user.email,
      },
    });

    alert("Successfully updated account type!");
    await navigate("/updateaccount/step1");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="account type">
          Are you registering as an individual or an organization?
        </InputLabel>
        <Controller
          as={
            <Select className={classes.typeSelect}>
              <MenuItem value="Individual">
                I'm registering as an individual
              </MenuItem>
              <MenuItem value="Organization">
                I'm registering as an organization
              </MenuItem>
            </Select>
          }
          name="type"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <NextButton
          type="submit"
          ariaLabel="Click here to complete step 1 of update account information and move to step 2."
          onClick={handleSubmit}
        />
      </form>
    </Container>
  );
}
