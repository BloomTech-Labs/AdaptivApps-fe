// React/Reach Router imports
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Box,
  Checkbox,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "row",
    width: 100,
  },
  boxSpacing: {
    marginRight: "11.2rem",
    width: 100,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    width: 100
  },
  label: {
    width: 90
  }
});

export default function Step4({ updateSportsDemo }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, setValue, control } = useForm();

  const onSubmit = async data => {
    // console.log(data.airRifle)
    updateSportsDemo({
      variables: {
        email: userEmail,
        airRifle: data.airRifle,
      },
    });
    alert("Successfully completed step 4 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step5of6`);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.checkBoxContainer}>
        <Box className={classes.boxSpacing}>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="airRifle" className={classes.label}>Air Rifle</InputLabel>
            <Controller
              as={<Checkbox />}
              name="airRifle"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing" className={classes.label}>Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
        </Box>
        <Box className={classes.boxSpacing}>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="airRifle">Air Rifle</InputLabel>
            <Controller
              as={<Checkbox />}
              name="airRifle"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
        </Box>
        <Box className={classes.boxSpacing}>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="airRifle">Air Rifle</InputLabel>
            <Controller
              as={<Checkbox />}
              name="airRifle"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
        </Box>
        <Box className={classes.boxSpacing}>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="airRifle">Air Rifle</InputLabel>
            <Controller
              as={<Checkbox />}
              name="airRifle"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="alpineSkiing">Alpine Skiing</InputLabel>
            <Controller
              as={<Checkbox />}
              name="alpineSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <NextButton
          type="submit"
          label="Next"
          onClick={handleSubmit}
          ariaLabel="Click here to complete step 4 and move onto step 5 of account information update."
        />
      </Box>
    </form>
  );
}

//   archery: Boolean @default(value: false)
//   badminton: Boolean @default(value: false)
//   baseball: Boolean @default(value: false)
//   beepBaseball: Boolean @default(value: false)
//   biathlon: Boolean @default(value: false)
//   blindHockey: Boolean @default(value: false)
//   boccia: Boolean @default(value: false)
//   bowling: Boolean @default(value: false)
//   boxing: Boolean @default(value: false)
//   canoe: Boolean @default(value: false)
//   cheerleading: Boolean @default(value: false)
//   crossFit: Boolean @default(value: false)
//   crossCountrySkiing: Boolean @default(value: false)
//   curling: Boolean @default(value: false)
//   cycling: Boolean @default(value: false)
//   equestrian: Boolean @default(value: false)
//   esports: Boolean @default(value: false)
//   fishing: Boolean @default(value: false)
//   goalball: Boolean @default(value: false)
//   golf: Boolean @default(value: false)
//   hiking: Boolean @default(value: false)
//   hunting: Boolean @default(value: false)
//   judo: Boolean @default(value: false)
//   juJitsu: Boolean @default(value: false)
//   lacrosse: Boolean @default(value: false)
//   mixedMartialArts: Boolean @default(value: false)
//   motorsportsMotorcross: Boolean @default(value: false)
//   mountainBiking: Boolean @default(value: false)
//   powerlifting: Boolean @default(value: false)
//   rafting: Boolean @default(value: false)
//   rockClimbing: Boolean @default(value: false)
//   rowing: Boolean @default(value: false)
//   sailing: Boolean @default(value: false)
//   scuba: Boolean @default(value: false)
//   shooting: Boolean @default(value: false)
//   skateboarding: Boolean @default(value: false)
//   snowboarding: Boolean @default(value: false)
//   sledHockey: Boolean @default(value: false)
//   soccerBlindSoccerFiveaside: Boolean @default(value: false)
//   soccerAmputeeCrutchSoccer: Boolean @default(value: false)
//   soccerPowerSoccer: Boolean @default(value: false)
//   soccerCPSevenaside: Boolean @default(value: false)
//   standupWheelchairPaddling: Boolean @default(value: false)
//   swimming: Boolean @default(value: false)
//   surfing: Boolean @default(value: false)
//   tableTennis: Boolean @default(value: false)
//   taekwondo: Boolean @default(value: false)
//   taiChi: Boolean @default(value: false)
//   trackField: Boolean @default(value: false)
//   triathlon: Boolean @default(value: false)
//   volleyballBeachVolleyball: Boolean @default(value: false)
//   volleyballSittingVolleyball: Boolean @default(value: false)
//   waterSkiing: Boolean @default(value: false)
//   wheelchairSkateboarding: Boolean @default(value: false)
//   wheelchairBasketball: Boolean @default(value: false)
//   wheelchairCurling: Boolean @default(value: false)
//   wheelchairFencing: Boolean @default(value: false)
//   wheelchairFootball: Boolean @default(value: false)
//   wheelchairSoftball: Boolean @default(value: false)
//   wheelchairRugby: Boolean @default(value: false)
//   wheelchairTennis: Boolean @default(value: false)
//   wrestling: Boolean @default(value: false)
//   yoga: Boolean @default(value: false)
//   other: Boolean @default(value: false)
