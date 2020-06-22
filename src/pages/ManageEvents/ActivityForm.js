// React imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useNavigate } from "@reach/router";
// Component imports
import LightTooltip from "../../theme/LightTooltip";
// Material-UI imports
import {
  makeStyles,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: "3rem",
    margin: theme.spacing(1),
    border: "1px solid #2962FF",
    background: "#2962FF",
    color: "#FFFFFF",
    height: "4rem",
    width: "8rem",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    "&:hover": {
      border: "1px solid #2962FF",
      background: "white",
      color: "#2962FF",
    },
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  form: { display: "flex", flexDirection: "column", width: "400px" },
}));

export default function ActivityForm({
  data,
  loading,
  createActivity,
  updateActivity,
  eventId,
  activityId,
  refetch,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState(data);
  const activity = currentActivity?.activity;
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      name: activity && activity.name,
      type: activity && activity.type,
      sportType: activity && activity.sportType,
      coaches: activity && activity.coaches,
      date: activity && moment(activity.date).format("yyyy-MM-DD"),
      startTime: activity && activity.startTime,
      endTime: activity && activity.endTime,
      location: activity && activity.location,
      link: activity && activity.link,
      sponsors: activity && activity.sponsors,
      details: activity && activity.details,
    },
  });
  useEffect(() => {
    if (!loading && !activity) setCurrentActivity(data);
    if (!loading && activity) {
      setValue([
        { name: activity.name },
        { type: activity.type },
        { sportType: activity.sportType },
        { coaches: activity.coaches },
        { date: moment(activity.date).format("yyyy-MM-DD") },
        { startTime: activity.startTime },
        { endTime: activity.endTime },
        { location: activity.location },
        { link: activity.link },
        { sponsors: activity.sponsors },
        { details: activity.details },
      ]);
    }
  }, [loading, currentActivity, setValue, data]);

  const onSubmit = async (formValues, e) => {
    e.preventDefault();
    if (window.location.pathname !== `/editActivity/${activityId}`) {
      if (!formValues.name || !formValues.type || !formValues.sportType || !formValues.coaches || !formValues.startTime || !formValues.endTime ||
        !formValues.date || !formValues.location || !formValues.link || !formValues.details) {
        alert("Please fill out all required fields!");
      }
      else {
        const { data } = await createActivity({
          variables: {
            name: formValues.name,
            type: formValues.type,
            sportType: formValues.sportType,
            coaches: formValues.coaches,
            date: moment(formValues.date).format("ddd MM/DD/YY"),
            startTime: formValues.startTime,
            endTime: formValues.endTime,
            location: formValues.location,
            link: formValues.link,
            sponsors: formValues.sponsors,
            details: formValues.details,
            eventId: eventId,
          },
        });
        alert("Successfully created an activity!");
        await refetch();
      }
    } else {
      if (!formValues.name || !formValues.type || !formValues.sportType || !formValues.coaches || !formValues.startTime || !formValues.endTime ||
        !formValues.date || !formValues.location || !formValues.link || !formValues.details) {
        alert("Please fill out all required fields!");
      }
      else {
        await updateActivity({
          variables: {
            name: formValues.name,
            type: formValues.type,
            sportType: formValues.sportType,
            coaches: formValues.coaches,
            date: moment(formValues.date).format("ddd MM/DD/YY"),
            startTime: formValues.startTime,
            endTime: formValues.endTime,
            location: formValues.location,
            link: formValues.link,
            sponsors: formValues.sponsors,
            details: formValues.details,
            activityId: activityId,
          },
        });
        alert("Successfully updated an activity!");
        await navigate(`/createEvent/${data?.activity?.event?.id}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputLabel className={classes.inputLabel} htmlFor="date">
        Date
      </InputLabel>
      <Controller
        as={<TextField />}
        type="date"
        placeholder="date"
        name="date"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="type">
        Activity Type
      </InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="Clinic">Clinic</MenuItem>
            <MenuItem value="Competition">Competition</MenuItem>
            <MenuItem value="Tournament">Tournament</MenuItem>
          </Select>
        }
        name="type"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel className={classes.inputLabel} htmlFor="sportType">
        Sport Type
      </InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="Archery">Archery</MenuItem>
            <MenuItem value="E-Sport">E-Sport</MenuItem>
            <MenuItem value="Table Tennis">Table Tennis</MenuItem>
            <MenuItem value="Track Field">Track Field</MenuItem>
            <MenuItem value="Wheel Chair Basketball">
              Wheel Chair Basketball
            </MenuItem>
            <MenuItem value="Wheelchair Tennis">Wheelchair Tennis</MenuItem>
            <MenuItem value="Swimming">Swimming</MenuItem>
            <MenuItem value="Sitting Volleyball">Sitting Volleyball</MenuItem>
          </Select>
        }
        name="sportType"
        variant="outlined"
        control={control}
        defaultValue=""
      />
      <InputLabel className={classes.inputLabel} htmlFor="name">
        Activity Name
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="name"
        name="name"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="coaches">
        Coaches
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="coaches"
        name="coaches"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="startTime">
        Start Time
      </InputLabel>
      <Controller
        as={<TextField />}
        type="time"
        placeholder="startTime"
        name="startTime"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="endTime">
        End Time
      </InputLabel>
      <Controller
        as={<TextField />}
        type="time"
        placeholder="endTime"
        name="endTime"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="location">
        Location
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="location"
        name="location"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="link">
        Zoom Link
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="link"
        name="link"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="details">
        Activity Details
      </InputLabel>
      <Controller
        as={<TextField />}
        name="details"
        variant="outlined"
        multiline
        rows="8"
        control={control}
      />
      <Box>
        <LightTooltip title="Add Activity">
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
            aria-label="Click here to add an activity"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </LightTooltip>
      </Box>
    </form>
  );
}
