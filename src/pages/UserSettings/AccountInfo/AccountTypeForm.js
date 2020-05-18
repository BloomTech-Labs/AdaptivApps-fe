// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Component imports
import NextButton from "../../../theme/NextButton";
// Material-UI imports
import {
  makeStyles,
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

export default function AccountTypeForm({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    updateProfile({
      variables: {
        type: data.type,
        email: userEmail,
      },
    });

    alert("Successfully updated account type!");
    data?.type === "Individual"
      ? await navigate(`/updateaccount/${userEmail}/step1of6`)
      : await navigate(`/updateaccount/${userEmail}/org/step1of6`);
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
