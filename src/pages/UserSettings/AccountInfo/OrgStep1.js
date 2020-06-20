import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { ORG_PROFILE } from "../queries";
// Component imports
import FinishButton from "../../../theme/SmallFormButton";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  nameBox: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
  },
  firstInput: {
    marginRight: "2.4rem",
  },
  boxSpacing: {
    marginBottom: "2.4rem",
  },
  addressBox: {
    display: "flex",
    marginBottom: "2.4rem",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
  },
  typeSelect: {
    width: 744,
    height: 48,
  },
  bioBox: {
    marginBottom: 200,
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function OrgStep1({ updateOrgProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(ORG_PROFILE, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {

    }
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          { phoneNumber: currentUserInfo && currentUserInfo.profile.phoneNumber },
          { userName: currentUserInfo && currentUserInfo.profile.userName },
          { city: currentUserInfo && currentUserInfo.profile.city },
          { state: currentUserInfo && currentUserInfo.profile.state },
          { bio: currentUserInfo && currentUserInfo.profile.bio },
          { orgName: currentUserInfo && currentUserInfo.profile.extProfile.orgName },
          { website: currentUserInfo && currentUserInfo.profile.extProfile.website },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);

  const onSubmit = async data => {
    await updateOrgProfile({
      variables: {
        email: userEmail,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        bio: data.bio,
        userName: data.orgName,
        orgName: data.orgName,
        website: data.website,
      },
    });

    alert("Successfully updated organization account information!");
    await navigate(`/`);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="orgName">Organization Name*</InputLabel>
        <Controller
          as={<TextField />}
          name="orgName"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="website">Organization Website*</InputLabel>
        <Controller
          as={<TextField />}
          name="website"
          type="text"
          variant="outlined"
          control={control}
          // defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="phoneNumber">
          Please enter your phone number
        </InputLabel>
        <Controller
          as={<TextField />}
          name="phoneNumber"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel htmlFor="city">City*</InputLabel>
          <Controller
            as={<TextField />}
            name="city"
            type="text"
            variant="outlined"
            control={control}
            // defaultValue=""
          />
        </Box>
        <Box>
          <InputLabel htmlFor="state">State*</InputLabel>
          <Controller
            as={<TextField />}
            name="state"
            type="text"
            variant="outlined"
            control={control}
            // defaultValue=""
          />
        </Box>
      </Box>
      <Box className={classes.bioBox}>
        <InputLabel className={classes.inputLabel} htmlFor="bio">
          Tell us about your organization
        </InputLabel>
        <Controller
          as={<TextField />}
          name="bio"
          type="text"
          variant="outlined"
          multiline
          rows="8"
          control={control}
        />
      </Box>
      <Typography>* required field</Typography>
      <Box className={classes.btnBox}>
        <FinishButton
          label="Finish"
          type="submit"
          onClick={handleSubmit}
          ariaLabel="Click here to finish updating your organization information."
        />
      </Box>
    </form>
  );
}
