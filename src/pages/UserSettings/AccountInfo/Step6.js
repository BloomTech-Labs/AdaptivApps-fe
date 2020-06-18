// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import FinishButton from "../../../theme/FormButton";
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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "& .MuiSelect-root": {
      width: 744,
    },
  },
  spacing: {
    marginTop: "2.4rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "2.9rem",
  },
});

export default function Step6({ updateDemo3 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    await updateDemo3({
      variables: {
        email: userEmail,
        becomeAthleteMentor: data.becomeAthleteMentor,
        athleteMentorHelp: data.athleteMentorHelp,
        athleteMentorSport: data.athleteMentorSport,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        amplaEmail: data.amplaEmail,
        hangerClinic: data.hangerClinic,
        challengeMagazine: data.challengeMagazine,
      },
    });
    alert("Successfully updated all required account information!");
    await navigate(`/`);
  };
  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={6} stepNumber={6} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="becomeAthleteMentor">
          Are you interested in becoming an Athlete Mentor?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="becomeAthleteMentor"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="athleteMentorHelp" className={classes.spacing}>
          Are you interested in being mentored by an Athlete Mentor?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="athleteMentorHelp"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="athleteMentorSport" className={classes.spacing}>
          If you would like to be involved in the Athlete Mentorship Program,
          which is your preferred sport?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Air Rifle">Air Rifle</MenuItem>
              <MenuItem value="Alpine Skiing">Alpine Skiing</MenuItem>
              <MenuItem value="Archery">Archery</MenuItem>
              <MenuItem value="Badminton">Badminton</MenuItem>
              <MenuItem value="Baseball">Baseball</MenuItem>
              <MenuItem value="Beep Baseball">Beep Baseball</MenuItem>
              <MenuItem value="Biathlon">Biathlon</MenuItem>
              <MenuItem value="Blind Hockey">Blind Hockey</MenuItem>
              <MenuItem value="Boccia">Boccia</MenuItem>
              <MenuItem value="Bowling">Bowling</MenuItem>
              <MenuItem value="Boxing">Boxing</MenuItem>
              <MenuItem value="Canoe">Canoe</MenuItem>
              <MenuItem value="Cheerleading">Cheerleading</MenuItem>
              <MenuItem value="CrossFit">CrossFit</MenuItem>
              <MenuItem value="Cross-Country Skiing">
                Cross-Country Skiing
              </MenuItem>
              <MenuItem value="Curling">Curling</MenuItem>
              <MenuItem value="Cycling">Cycling</MenuItem>
              <MenuItem value="Equestrian">Equestrian</MenuItem>
              <MenuItem value="Esports">Esports</MenuItem>
              <MenuItem value="Fishing">Fishing</MenuItem>
              <MenuItem value="Goalball">Goalball</MenuItem>
              <MenuItem value="Golf">Golf</MenuItem>
              <MenuItem value="Hiking">Hiking</MenuItem>
              <MenuItem value="Hunting">Hunting</MenuItem>
              <MenuItem value="Judo">Judo</MenuItem>
              <MenuItem value="Jiu Jitsu">Ju Jitsu</MenuItem>
              <MenuItem value="Lacrosse">Lacrosse</MenuItem>
              <MenuItem value="Mixed Martial Arts">Mixed Martial Arts</MenuItem>
              <MenuItem value="Motorsports/Motorcross">
                Motorsports/Motorcross
              </MenuItem>
              <MenuItem value="Mountain Biking">Mountain Biking</MenuItem>
              <MenuItem value="Powerlifting">Powerlifting</MenuItem>
              <MenuItem value="Rafting">Rafting</MenuItem>
              <MenuItem value="Rock Climbing">Rock Climbing</MenuItem>
              <MenuItem value="Rowing">Rowing</MenuItem>
              <MenuItem value="Sailing">Sailing</MenuItem>
              <MenuItem value="Scuba">Scuba</MenuItem>
              <MenuItem value="Shooting">Shooting</MenuItem>
              <MenuItem value="Skateboarding">Skateboarding</MenuItem>
              <MenuItem value="Snowboarding">Snowboarding</MenuItem>
              <MenuItem value="Sled Hockey">Sled Hockey</MenuItem>
              <MenuItem value="Blind Soccer 5-a-side">
                Blind Soccer 5-a-side
              </MenuItem>
              <MenuItem value="Amputee/Crutch Soccer">
                Amputee/Crutch Soccer
              </MenuItem>
              <MenuItem value="Power Soccer">Power Soccer</MenuItem>
              <MenuItem value="CP 7-a-side">CP 7-a-side</MenuItem>
              <MenuItem value="Stand-up/Wheelchair Paddling">
                Stand-up/Wheelchair Paddling
              </MenuItem>
              <MenuItem value="Swimming">Swimming</MenuItem>
              <MenuItem value="Surfing">Surfing</MenuItem>
              <MenuItem value="Table Tennis">Table Tennis</MenuItem>
              <MenuItem value="Taekwondo">Taekwondo</MenuItem>
              <MenuItem value="Tai Chi">Tai Chi</MenuItem>
              <MenuItem value="Track & Field">Track & Field</MenuItem>
              <MenuItem value="Triathlon">Triathlon</MenuItem>
              <MenuItem value="Beach Volleyball">Beach Volleyball</MenuItem>
              <MenuItem value="Sitting Volleyball">Sitting Volleyball</MenuItem>
              <MenuItem value="Water Skiing">Water Skiing</MenuItem>
              <MenuItem value="WCMX (Wheelchair Skateboarding)">
                WCMX (Wheelchair Skateboarding)
              </MenuItem>
              <MenuItem value="Wheelchair Basketball">
                Wheelchair Basketball
              </MenuItem>
              <MenuItem value="Wheelchair Curling">Wheelchair Curling</MenuItem>
              <MenuItem value="Wheelchair Fencing">Wheelchair Fencing</MenuItem>
              <MenuItem value="Wheelchair Football">
                Wheelchair Football
              </MenuItem>
              <MenuItem value="Wheelchair Softball">
                Wheelchair Softball
              </MenuItem>
              <MenuItem value="Wheelchair Rugby">Wheelchair Rugby</MenuItem>
              <MenuItem value="Wheelchair Tennis">Wheelchair Tennis</MenuItem>
              <MenuItem value="Wrestling">Wrestling</MenuItem>
              <MenuItem value="Yoga">Yoga</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="athleteMentorSport"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="acsDiscovery" className={classes.spacing}>
          How did you hear about Angel City Sports?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Outreach Event">Outreach Event</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Existing Angel City athlete/volunteer">
                Existing Angel City athlete/volunteer
              </MenuItem>
              <MenuItem value="Like-minded organization">
                Like-minded organization
              </MenuItem>
              <MenuItem value="Social Media">Social Media</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="acsDiscovery"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel
          htmlFor="acsOrgSpecificDiscovery"
          className={classes.spacing}
        >
          Did you hear about Angel City Sports through any of the following
          organizations?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Hangar Clinic or Hangar Clinician">
                Hangar Clinic or Hangar Clinician
              </MenuItem>
              <MenuItem value="Triumph Foundation">Triumph Foundation</MenuItem>
              <MenuItem value="Wayfinder Family Services (formerly Junior Blind)">
                Wayfinder Family Services (formerly Junior Blind)
              </MenuItem>
              <MenuItem value="The Training Hall">The Training Hall</MenuItem>
              <MenuItem value="Never Say Never">Never Say Never</MenuItem>
              <MenuItem value="Challenged Athletes Foundation">
                Challenged Athletes Foundation
              </MenuItem>
              <MenuItem value="Angel City Sports Oregon">
                Angel City Sports Oregon
              </MenuItem>
              <MenuItem value="Abilities Expo">Abilities Expo</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="acsOrgSpecificDiscovery"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="amplaEmail" className={classes.spacing}>
          Are you interested in expanding career opportunities and being added
          to the Ampla Partners email list?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="amplaEmail"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="hangerClinic" className={classes.spacing}>
          Would you like to receive information about Hangar Clinic?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="hangerClinic"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="challengeMagazine" className={classes.spacing}>
          Would you like to be signed up to receive the Challenge Magazine
          published by Disabled Sports USA?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="challengeMagazine"
          type="select"
          className={classes.select}
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box className={classes.btnBox}>
          <FinishButton
            type="submit"
            label="Finish"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 6 of account update and go back to account settings."
          />
        </Box>
      </form>
    </Box>
  );
}
