// React/Reach Router imports
import React from "react";
import { useNavigate, useParams } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Component imports
import NextButton from "../../../theme/FormButton";
import ProgressBar from "../../../theme/ProgressBar"
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: '67.5%'
  },
  form: {
    height: "80vh",
    maxwidth: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  typeSelect: {
    width: 744,
    height: 48,
  },
  box: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function AccountTypeForm({
  updateProfile,
 
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();
  
  const onSubmit = async data => {
    await updateProfile({
      variables: {
        type: data.type,
        email: userEmail,
      },
    });

    alert("Successfully updated account type!");
    data?.type === "Individual"
      ? await navigate(`/updateaccount/${userEmail}/step1of6`)
      : await navigate(`/updateaccount/${userEmail}/orginfo`);
  };

  return (
    <Box className={classes.root}>
    <ProgressBar activeStep={0}  userEmail={userEmail}/>
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <InputLabel htmlFor="account type">
        Are you registering as an individual or an organization?
      </InputLabel>
      <Box className={classes.box}>
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
      </Box>
      <Box className={classes.btnWrapper}>
        <NextButton
          type="submit"
          label={"Next"}
          ariaLabel="Click here to complete step 1 of update account information and move to step 2."
          onClick={handleSubmit}
          className={classes.btn}
        />
      </Box>
    </form>
    </Box>
  );
}
