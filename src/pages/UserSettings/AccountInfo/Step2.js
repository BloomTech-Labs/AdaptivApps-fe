// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
import ProgressBar from '../../../theme/ProgressBar'
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
    marginTop: "11.2rem",
  },
});

export default function Step2({ updateExtProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();
 
  const onSubmit = async data => {
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
  };

  return (
    <>
    <ProgressBar activeStep={2} stepNumber={2} userEmail={userEmail} />
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
            defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
      />
      <InputLabel htmlFor="physicalDisability">
        Please select the category of physical disability that is most accurate
        for you
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
            <MenuItem value="Charcot Marie Tooth">Charcot Marie Tooth</MenuItem>
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
            <MenuItem value="I use a power chair">I use a power chair</MenuItem>
          </Select>
        }
        name="mobilityStatus"
        type="select"
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
    </>
  );
}
