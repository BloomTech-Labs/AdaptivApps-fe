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
  Typography,
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
    width: "100%",
    marginTop: "2.7rem",
  },
  boxSpacing: {
    width: "100%",
  },
  checkbox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    width: "70%",
  },
  check: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "6.9rem",
  },
});

export default function Step4({ updateSportsDemo }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    updateSportsDemo({
      variables: {
        email: userEmail,
        airRifle: data.airRifle,
        alpineSkiing: data.alpineSkiing,
        archery: data.archery,
        badminton: data.badminton,
        baseball: data.baseball,
        beepBaseball: data.beepBaseball,
        biathlon: data.biathlon,
        blindHockey: data.blindHockey,
        boccia: data.boccia,
        bowling: data.bowling,
        boxing: data.boxing,
        canoe: data.canoe,
        cheerleading: data.cheerleading,
        crossFit: data.crossFit,
        crossCountrySkiing: data.crossCountrySkiing,
        curling: data.curling,
        cycling: data.cycling,
        equestrian: data.equestrian,
        esports: data.esports,
        fishing: data.fishing,
        goalball: data.goalball,
        golf: data.golf,
        hiking: data.hiking,
        hunting: data.hunting,
        judo: data.judo,
        juJitsu: data.juJitsu,
        lacrosse: data.lacrosse,
        mixedMartialArts: data.mixedMartialArts,
        motorsportsMotorcross: data.motorsportsMotorcross,
        mountainBiking: data.mountainBiking,
        powerlifting: data.powerlifting,
        rafting: data.rafting,
        rockClimbing: data.rockClimbing,
        rowing: data.rowing,
        sailing: data.sailing,
        scuba: data.scuba,
        shooting: data.shooting,
        skateboarding: data.skateboarding,
        snowboarding: data.snowboarding,
        sledHockey: data.sledHockey,
        soccerBlindSoccerFiveaside: data.soccerBlindSoccerFiveaside,
        soccerAmputeeCrutchSoccer: data.soccerAmputeeCrutchSoccer,
        soccerPowerSoccer: data.soccerPowerSoccer,
        soccerCPSevenaside: data.soccerCPSevenaside,
        standupWheelchairPaddling: data.standupWheelchairPaddling,
        swimming: data.swimming,
        surfing: data.surfing,
        tableTennis: data.tableTennis,
        taekwondo: data.taekwondo,
        taiChi: data.taiChi,
        trackField: data.trackField,
        triathlon: data.triathlon,
        volleyballBeachVolleyball: data.volleyballBeachVolleyball,
        volleyballSittingVolleyball: data.volleyballSittingVolleyball,
        waterSkiing: data.waterSkiing,
        wheelchairSkateboarding: data.wheelchairSkateboarding,
        wheelchairBasketball: data.wheelchairBasketball,
        wheelchairCurling: data.wheelchairCurling,
        wheelchairFencing: data.wheelchairFencing,
        wheelchairFootball: data.wheelchairFootball,
        wheelchairSoftball: data.wheelchairSoftball,
        wheelchairRugby: data.wheelchairRugby,
        wheelchairTennis: data.wheelchairTennis,
        wrestling: data.wrestling,
        yoga: data.yoga,
        other: data.other,
      },
    });
    alert("Successfully completed step 4 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step5of6`);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Typography>
        Which of the following sports have you participated in? (Please select
        all that apply)
      </Typography>
      <Box className={classes.checkBoxContainer}>
        <Box className={classes.boxSpacing}>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="airRifle" className={classes.label}>
              Air Rifle
            </InputLabel>
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
            <InputLabel htmlFor="alpineSkiing" className={classes.label}>
              Alpine Skiing
            </InputLabel>
            <Box>
              <Controller
                as={<Checkbox />}
                name="alpineSkiing"
                type="checkbox"
                control={control}
                color="primary"
                className={classes.check}
                defaultValue={false}
                value={true}
              />
            </Box>
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="archery" className={classes.label}>
              Archery
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="archery"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="badminton" className={classes.label}>
              Badminton
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="badminton"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="baseball" className={classes.label}>
              Baseball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="baseball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="beepBaseball" className={classes.label}>
              Beep Baseball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="beepBaseball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="biathlon" className={classes.label}>
              Biathlon
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="biathlon"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="blindHockey" className={classes.label}>
              Blind Hockey
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="blindHockey"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="boccia" className={classes.label}>
              Boccia
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="boccia"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="bowling" className={classes.label}>
              Bowling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="bowling"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="boxing" className={classes.label}>
              Boxing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="boxing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="canoe" className={classes.label}>
              Canoe
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="canoe"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="cheerleading" className={classes.label}>
              Cheerleading
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="cheerleading"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="crossFit" className={classes.label}>
              Crossfit
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="crossFit"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="crossCountrySkiing" className={classes.label}>
              Cross Country Skiing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="crossCountrySkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="curling" className={classes.label}>
              Curling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="curling"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="cycling" className={classes.label}>
              Cycling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="cycling"
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
            <InputLabel htmlFor="equestrian" className={classes.label}>
              Equestrian
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="equestrian"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="esports" className={classes.label}>
              Esports
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="esports"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="fishing" className={classes.label}>
              Fishing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="fishing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="goalball" className={classes.label}>
              Goalball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="goalball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="golf" className={classes.label}>
              Golf
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="golf"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="hiking" className={classes.label}>
              Hiking
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="hiking"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="hunting" className={classes.label}>
              Hunting
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="hunting"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="judo" className={classes.label}>
              Judo
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="judo"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="juJitsu" className={classes.label}>
              JiuJitsu
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="juJitsu"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="lacrosse" className={classes.label}>
              Lacrosse
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="lacrosse"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="mixedMartialArts" className={classes.label}>
              Mixed Martial Arts
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="mixedMartialArts"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="motorsportsMotorcross"
              className={classes.label}
            >
              Motorcross
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="motorsportsMotorcross"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="montainBiking" className={classes.label}>
              Mountain Biking
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="montainBiking"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="powerlifting" className={classes.label}>
              Powerlifting
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="powerlifting"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="rafting" className={classes.label}>
              Rafting
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="rafting"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="rockClimbing" className={classes.label}>
              Rock Climbing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="rockClimbing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="rowing" className={classes.label}>
              Rowing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="rowing"
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
            <InputLabel htmlFor="sailing" className={classes.label}>
              Sailing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="sailing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="scuba" className={classes.label}>
              Scuba
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="scuba"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="shooting" className={classes.label}>
              Shooting
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="shooting"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="skateboarding" className={classes.label}>
              Skateboarding
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="skateboarding"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="snowboarding" className={classes.label}>
              Snowboarding
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="snowboarding"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="sledHockey" className={classes.label}>
              Sled Hockey
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="sledHockey"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="soccerBlindSoccerFiveaside"
              className={classes.label}
            >
              Blind Soccer 5-a-side
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="soccerBlindSoccerFiveaside"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="soccerAmputeeCrutchSoccer"
              className={classes.label}
            >
              Crutch Soccer
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="soccerAmputeeCrutchSoccer"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="soccerPowerSoccer" className={classes.label}>
              Power Soccer
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="soccerPowerSoccer"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="soccerCPSevenaside" className={classes.label}>
              CP 7-a-side
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="soccerCPSevenaside"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="standupWheelchairPaddling"
              className={classes.label}
            >
              Wheelchair Paddling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="standupWheelchairPaddling"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="swimming" className={classes.label}>
              Swimming
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="swimming"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="surfing" className={classes.label}>
              Surfing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="surfing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="tableTennis" className={classes.label}>
              Table Tennis
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="tableTennis"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="taekwondo" className={classes.label}>
              Taekwondo
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="taekwondo"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="taiChi" className={classes.label}>
              Tai Chi
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="taiChi"
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
            <InputLabel htmlFor="trackField" className={classes.label}>
              Track and Field
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="trackField"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="triathlon" className={classes.label}>
              Triathlon
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="triathlon"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="volleyballBeachVolleyball"
              className={classes.label}
            >
              Beach Volleyball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="volleyballBeachVolleyball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="volleyballSittingVolleyball"
              className={classes.label}
            >
              Sitting Volleyball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="volleyballSittingVolleyball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="waterSkiing" className={classes.label}>
              Water Skiing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="waterSkiing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="wheelchairSkateboarding"
              className={classes.label}
            >
              Wheelchair Skateboarding
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairSkateboarding"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel
              htmlFor="wheelchairBasketball"
              className={classes.label}
            >
              Wheelchair Basketball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairBasketball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairCurling" className={classes.label}>
              Wheelchair Curling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairCurling"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairFencing" className={classes.label}>
              Wheelchair Fencing
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairFencing"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairFootball" className={classes.label}>
              Wheelchair Football
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairFootball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairSoftball" className={classes.label}>
              Wheelchair Softball
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairSoftball"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairRugby" className={classes.label}>
              Wheelchair Rugby
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairRugby"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wheelchairTennis" className={classes.label}>
              Wheelchair Tennis
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wheelchairTennis"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="wrestling" className={classes.label}>
              Wrestling
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="wrestling"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="yoga" className={classes.label}>
              Yoga
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="yoga"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
          <Box className={classes.checkbox}>
            <InputLabel htmlFor="other" className={classes.label}>
              Other
            </InputLabel>
            <Controller
              as={<Checkbox />}
              name="other"
              type="checkbox"
              control={control}
              color="primary"
              defaultValue={false}
              value={true}
            />
          </Box>
        </Box>
      </Box>
      <Box className={classes.btnBox}>
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
