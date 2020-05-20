// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Container,
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
  genderBirthBox: {
    display: "flex",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
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
    marginTop: "11.2rem"
  }
});

export default function Step2() {
  const classes = useStyles();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {};

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.genderBirthBox}>
        <Box>
          <InputLabel required htmlFor="gender">
            Please select gender
          </InputLabel>
          <Controller
            as={
              <Select className={classes.shortSelect}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            }
            name="legal"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
        <Box>
          <InputLabel required htmlFor="birthday">
            Please enter your birthday
          </InputLabel>
          <Controller
            as={<TextField />}
            name="birthday"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
      </Box>
      <InputLabel required htmlFor="ec1Name">
        Please enter the name of your emergency contact
      </InputLabel>
      <Controller
        as={<TextField />}
        name="ec1Name"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel required htmlFor="ec1Relation">
        Please tell us how your emergency contact is related to you
      </InputLabel>
      <Controller
        as={<TextField />}
        name="ec1Relation"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel required htmlFor="ec1Phone">
        Please enter the best phone number for your emergency contact
      </InputLabel>
      <Controller
        as={<TextField />}
        name="ec1Phone"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel htmlFor="legal">Are you over 18 years old?</InputLabel>
      <Controller
        as={
          <Select className={classes.longSelect}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        }
        name="legal"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel htmlFor="legal">Are you over 18 years old?</InputLabel>
      <Controller
        as={
          <Select className={classes.longSelect}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        }
        name="legal"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel htmlFor="legal">Are you over 18 years old?</InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        }
        name="legal"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <Box className={classes.btnBox}>
        <NextButton
          label="Next"
          type="submit"
          onClick={handleSubmit}
          ariaLabel="Click here to complete step 2 and move onto step 3 of account information update."
        />
      </Box>
    </form>
  );
}
