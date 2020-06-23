// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_2 } from "../queries";
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
    justifyContent: "space-between",
    marginTop: "8.8rem",
  },
});

export default function Step2({ updateExtProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_2, {
    variables: { email: userEmail },
  });

  console.log('Query inside step2', defaultInfo)
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      gender: currentUserInfo && currentUserInfo?.profile?.extProfile?.gender,
      birthday: currentUserInfo && currentUserInfo?.profile?.extProfile?.birthday,
      eC1Name: currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Name,
      eC1Phone: currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Phone,
      eC1Relation:
        currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Relation,
      physicalDisability:
        currentUserInfo &&
        currentUserInfo?.profile?.extProfile?.disability?.physicalDisability,
      detailedDisabilities:
        currentUserInfo &&
        currentUserInfo?.profile?.extProfile?.disability?.detailedDisabilities,
      mobilityStatus:
        currentUserInfo && currentUserInfo?.profile?.extProfile?.mobilityStatus,
    },
  });

  // Sets default values in input fields with current user's info
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        {
          gender: currentUserInfo && currentUserInfo?.profile?.extProfile?.gender,
        },
        {
          birthday:
            currentUserInfo && currentUserInfo?.profile?.extProfile?.birthday,
        },
        {
          eC1Name:
            currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Name,
        },
        {
          eC1Phone:
            currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Phone,
        },
        {
          eC1Relation:
            currentUserInfo && currentUserInfo?.profile?.extProfile?.eC1Relation,
        },
        {
          physicalDisability:
            currentUserInfo &&
            currentUserInfo?.profile?.extProfile?.disability?.physicalDisability,
        },
        {
          detailedDisabilities:
            currentUserInfo &&
            currentUserInfo?.profile?.extProfile?.disability?.detailedDisabilities,
        },
        {
          mobilityStatus:
            currentUserInfo &&
            currentUserInfo?.profile?.extProfile?.mobilityStatus,
        },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);
console.log('Inside step2', currentUserInfo)
  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateExtProfile({
      variables: {
        email: userEmail,
        gender: data.gender,
        birthday: data.birthday,
        eC1Name: data.eC1Name,
        eC1Phone: data.eC1Phone,
        eC1Relation: data.eC1Relation,
        physicalDisability: data.physicalDisability,
        detailedDisabilities: data.detailedDisabilities,
        mobilityStatus: data.mobilityStatus,
      },
    });
    alert("Succesfully completed step 2 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step3of6`);
  });

  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  const onSave = handleSubmit(async data => {
    await updateExtProfile({
      variables: {
        email: userEmail,
        gender: data.gender,
        birthday: data.birthday,
        eC1Name: data.eC1Name,
        eC1Phone: data.eC1Phone,
        eC1Relation: data.eC1Relation,
        physicalDisability: data.physicalDisability,
        detailedDisabilities: data.detailedDisabilities,
        mobilityStatus: data.mobilityStatus,
      },
    });

    alert("Succesfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={2} stepNumber={2} userEmail={userEmail} />
      <form className={classes.form}>
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
              name="gender"
              type="select"
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
              type="date"
              variant="outlined"
              control={control}
            />
          </Box>
        </Box>
        <InputLabel required htmlFor="eC1Name">
          Please enter the name of your emergency contact
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Name"
          type="text"
          variant="outlined"
          control={control}
        />
        <InputLabel required htmlFor="eC1Relation">
          Please tell us how your emergency contact is related to you
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Relation"
          type="text"
          variant="outlined"
          control={control}
        />
        <InputLabel required htmlFor="eC1Phone">
          Please enter the best phone number for your emergency contact
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Phone"
          type="text"
          variant="outlined"
          control={control}
        />
        <InputLabel htmlFor="physicalDisability">
          Please select the category of physical disability that is most
          accurate for you
        </InputLabel>
        <Controller
          as={
            <Select className={classes.longSelect}>
              <MenuItem value="Ataxia">Ataxia</MenuItem>
              <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
              <MenuItem value="Hypertonia">Hypertonia</MenuItem>
              <MenuItem value="Impaired Muscle Power">
                Impaired Muscle Power
              </MenuItem>
              <MenuItem value="Impaired Passive Range">
                Impaired Passive Range
              </MenuItem>
              <MenuItem value="Intellectual Impairment">
                Intellectual Impairment
              </MenuItem>
              <MenuItem value="Leg Length Discrepancy">
                Leg Length Discrepancy
              </MenuItem>
              <MenuItem value="Limb Deficiency">Limb Deficiency</MenuItem>
              <MenuItem value="Short Stature">Short Stature</MenuItem>
              <MenuItem value="Vision Impairment">Vision Impairment</MenuItem>
              <MenuItem value="None">
                I do not have a disability/impairment
              </MenuItem>
            </Select>
          }
          name="physicalDisability"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="detailedDisabilities">
          Please select the specific disability diagnosis that is most accurate
          for you
        </InputLabel>
        <Controller
          as={
            <Select className={classes.longSelect}>
              <MenuItem value="ALS">ALS</MenuItem>
              <MenuItem value="Amputation">Amputation</MenuItem>
              <MenuItem value="Arthogyposis">Arthogyposis</MenuItem>
              <MenuItem value="Brachial Plexus Injury">
                Brachial Plexus Injury
              </MenuItem>
              <MenuItem value="Cauda Equina Syndrome">
                Cauda Equina Syndrome
              </MenuItem>
              <MenuItem value="Cerebral Palsy">Cerebral Palsy</MenuItem>
              <MenuItem value="Arthritis">Arthritis</MenuItem>
              <MenuItem value="Charcot Marie Tooth">
                Charcot Marie Tooth
              </MenuItem>
              <MenuItem value="Drop Foot">Drop Foot</MenuItem>
              <MenuItem value="Dwarfism">Dwarfism</MenuItem>
              <MenuItem value="Ehlers Danlos Syndrome">
                Ehlers Danlos Syndrome
              </MenuItem>
              <MenuItem value="Fibromyalgia">Fibromyalgia</MenuItem>
              <MenuItem value="Guillain-Barre Syndrome">
                Guillain-Barre Syndrome
              </MenuItem>
              <MenuItem value="Multiple Sclerosis">Multiple Sclerosis</MenuItem>
              <MenuItem value="Muscular Dystrophy">Muscular Dystrophy</MenuItem>
              <MenuItem value="Osteogenesis Imperfecta">
                Osteogenesis Imperfecta
              </MenuItem>
              <MenuItem value="Osteoporosis">Osteoporosis</MenuItem>
              <MenuItem value="Parkinsons">Parkinsons</MenuItem>
              <MenuItem value="Polio">Polio</MenuItem>
              <MenuItem value="Prader Willi Syndrome">
                Prader Willi Syndrome
              </MenuItem>
              <MenuItem value="Spina Bifida">Spina Bifida</MenuItem>
              <MenuItem value="Paraplegia">Paraplegia</MenuItem>
              <MenuItem value="Quadraplegia">Quadraplegia</MenuItem>
              <MenuItem value="TBI">TBI</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="N/A">
                I choose not to answer this question
              </MenuItem>
            </Select>
          }
          name="detailedDisabilities"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="mobilityStatus">
          Please select the mobility status that is most accurate for you
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="I walk independently">
                I walk independently
              </MenuItem>
              <MenuItem value="I walk with an assistive device">
                I walk with an assistive device
              </MenuItem>
              <MenuItem value="I use a manual wheelchair">
                I use a manual wheelchair
              </MenuItem>
              <MenuItem value="I use a power chair">
                I use a power chair
              </MenuItem>
            </Select>
          }
          name="mobilityStatus"
          type="select"
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
            ariaLabel="Click here to complete step 2 and move onto step 3 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
