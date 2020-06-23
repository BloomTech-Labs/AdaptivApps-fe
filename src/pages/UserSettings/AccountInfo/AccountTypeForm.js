// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_TYPE } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import ProgressBar from "../../../theme/ProgressBar";
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
    width: "67.5%",
  },
  form: {
    height: "80vh",
    maxwidth: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  selectContainer: {
    marginBottom: "11rem"
  },  
  typeSelect: {
    width: "74.4rem",
    height: "4.8rem",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.6rem"
  }, 
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function AccountTypeForm({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, setValue, control } = useForm();
  const { data: defaultInfo, loading } = useQuery(PROFILE_TYPE, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            type: currentUserInfo?.profile?.type,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
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
      <ProgressBar activeStep={0} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.selectContainer}>

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
        <InputLabel htmlFor="role identity">
          Which role do you best identify with?
        </InputLabel>
        <Box className={classes.roleBox}>
          <Controller
            as={
              <Select className={classes.typeSelect}>
                <MenuItem value="Athlete">
                  Adaptive Athlete
                </MenuItem>
                <MenuItem value="Ally/Volunteer">
                  Ally/Volunteer - I want to participate and will volunteer to help promote.
                </MenuItem>
                <MenuItem value="Donor/Supporter">
                Donor/Supporter - I want to participate and will donate or help fundraise.
                </MenuItem>
              </Select>
            }
            name="type"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
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
