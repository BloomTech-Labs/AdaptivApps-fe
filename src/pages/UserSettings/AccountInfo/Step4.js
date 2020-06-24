// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_4 } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
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
    width: "67.5%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  spacing: {
    marginTop: "2.4rem",
  },
  textBox: {
    marginBottom: "35rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function Step3({ updateDemo2 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_4, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      favProAthletes:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.favProAthletes,
      favCelebs:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.favCelebs,
      goals:
        currentUserInfo && currentUserInfo?.profile?.demographicProfile?.goals,
      specialTalents:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.specialTalents,
      adaptivSportsParticipation:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile
          ?.adaptivSportsParticipation,
      notParticipating:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.notParticipating,
      sportEquipmentNeed:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.sportEquipmentNeed,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        {
          favProAthletes:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.favProAthletes,
        },
        {
          favCelebs:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.favCelebs,
        },
        {
          goals:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.goals,
        },
        {
          specialTalents:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.specialTalents,
        },
        {
          adaptivSportsParticipation:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile
              ?.adaptivSportsParticipation,
        },
        {
          notParticipating:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.notParticipating,
        },
        {
          sportEquipmentNeed:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.sportEquipmentNeed,
        },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateDemo2({
      variables: {
        email: userEmail,
        favProAthletes: data.favProAthletes,
        favCelebs: data.favCelebs,
        goals: data.goals,
        specialTalents: data.specialTalents,
        adaptivSportsParticipation: data.adaptivSportsParticipation,
        notParticipating: data.notParticipating,
        sportEquipmentNeed: data.sportEquipmentNeed,
      },
    });

    alert("Successfully completed step 4 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step5of6`);
  });
  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  const onSave = handleSubmit(async data => {
    await updateDemo2({
      variables: {
        email: userEmail,
        favProAthletes: data.favProAthletes,
        favCelebs: data.favCelebs,
        goals: data.goals,
        specialTalents: data.specialTalents,
        adaptivSportsParticipation: data.adaptivSportsParticipation,
        notParticipating: data.notParticipating,
        sportEquipmentNeed: data.sportEquipmentNeed,
      },
    });
    alert("Successfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={4} stepNumber={4} userEmail={userEmail} />
      <form className={classes.form}>
        <InputLabel htmlFor="favProAthletes">
          Who are your favorite pro athletes?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="favProAthletes"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="favCelebs">
          Who are your favorite celebrities?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="favCelebs"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="goals">What are your goals?</InputLabel>
        <Controller
          as={<TextField />}
          name="goals"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box>
          <InputLabel className={classes.spacing} htmlFor="specialTalents">
            Do you have any special talents?
          </InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem ><em>Please choose one</em></MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            }
            name="specialTalents"
            type="select"
            variant="outlined"
            control={control}
            defaultValue=""
          />
          <InputLabel
            className={classes.spacing}
            htmlFor="adaptivSportsParticipation"
          >
            Have you participated in Adaptive Sports before?
          </InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem ><em>Please choose on</em></MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            }
            name="adaptivSportsParticipation"
            type="select"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
        <InputLabel className={classes.spacing} htmlFor="notParticipating">
          If you are not participating in as many adaptive sports as you'd like,
          can you please share why?
        </InputLabel>
        <Controller
          as={<Select>
            <MenuItem ><em>Please choose on</em></MenuItem>
            <MenuItem value="Cost to participate">Cost to participate</MenuItem>
            <MenuItem value="Family/safety concerns">Family/safety concerns</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Fear">Fear</MenuItem>
            <MenuItem value="Lack of motivation">Lack of motivation</MenuItem>
            <MenuItem value="Personal care needs">Personal care needs</MenuItem>
            <MenuItem value="Access to equipment">Access to equipment</MenuItem>
            <MenuItem value="I haven't found a sport I enjoy">I haven't found a sport I enjoy</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>}
          name="notParticipating"
          type="select"
          variant="outlined"
          control={control}
          // className={classes.textBox}
          defaultValue=""
        />
        <InputLabel htmlFor="goals">If you selected access to equipment, what adaptive sports equipment do you need to participate in sports?</InputLabel>
        <Controller
          as={<TextField />}
          name="goals"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            ariaLabel="Click to save and continue later and return to settings page."
            onClick={onSave}
          />
          <NextButton
            label="Next"
            onClick={onNext}
            ariaLabel="Click here to complete step 4 and move onto step 5 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
