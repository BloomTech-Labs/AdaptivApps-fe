import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "@reach/router";
import { useNavigate } from "@reach/router";

import {
  makeStyles,
  Container,
  Typography,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: "3rem",
    border: "1px solid #2962FF",
    color: "#2962FF",
    height: "4rem",
    width: "8rem",
    fontSize: "1.2rem",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  form: { display: "flex", flexDirection: "column", width: "400px" },
}));

export default function EventForm({
  updateData,
  createEvent,
  updateEvent,
  event,
  loading,
  eventId,
}) {
  const [currentEvent, setCurrentEvent] = useState(event);
  const classes = useStyles();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, setValue, control } = useForm({
    defaultValues: {
      type: currentEvent && currentEvent.type,
      sportType: currentEvent && currentEvent.sportType,
      tags: currentEvent && currentEvent.tags,
      title: currentEvent && currentEvent.title,
      host: currentEvent && currentEvent.host,
      coaches: currentEvent && currentEvent.coaches,
      speakers: currentEvent && currentEvent.speakers,
      date: currentEvent && currentEvent.date,
      startTime: currentEvent && currentEvent.startTime,
      endTime: currentEvent && currentEvent.endTime,
      location: currentEvent && currentEvent.location,
      link: currentEvent && currentEvent.link,
      sponsors: currentEvent && currentEvent.sponsors,
      imgUrl: currentEvent && currentEvent.imgUrl,
      details: currentEvent && currentEvent.details,
    },
  });

  useEffect(() => {
    if (!loading && !currentEvent) setCurrentEvent(event);
    if (!loading && currentEvent) {
      setValue([
        { type: currentEvent && currentEvent.type },
        { sportType: currentEvent && currentEvent.sportType },
        { tags: currentEvent && currentEvent.tags },
        { title: currentEvent && currentEvent.title },
        { host: currentEvent && currentEvent.host },
        { coaches: currentEvent && currentEvent.coaches },
        { speakers: currentEvent && currentEvent.speakers },
        { date: currentEvent && currentEvent.date },
        { startTime: currentEvent && currentEvent.startTime },
        { endTime: currentEvent && currentEvent.endTime },
        { location: currentEvent && currentEvent.location },
        { link: currentEvent && currentEvent.link },
        { sponsors: currentEvent && currentEvent.sponsors },
        { imgUrl: currentEvent && currentEvent.imgUrl },
        { details: currentEvent && currentEvent.details },
      ]);
    }
  }, [loading, currentEvent, setValue, event]);

  const onSubmit = async (formValues, e) => {
    if (window.location.pathname !== `/editEvent/${eventId}`) {
      const { data } = await createEvent({
        variables: {
          type: formValues.type,
          sportType: formValues.sportType,
          tags: formValues.tags,
          title: formValues.title,
          host: formValues.host,
          coaches: formValues.coaches,
          speakers: formValues.speakers,
          date: formValues.date,
          startTime: formValues.startTime,
          endTime: formValues.endTime,
          location: formValues.location,
          link: formValues.link,
          sponsors: formValues.sponsors,
          imgUrl: formValues.imgUrl,
          details: formValues.details,
        },
      });
      alert("Successfully created an event!");
      await navigate(`/createEvent/${data?.createEvent?.id}`);
    } else {
      await updateEvent({
        variables: {
          id: eventId,
          type: formValues.type,
          sportType: formValues.sportType,
          tags: formValues.tags,
          title: formValues.title,
          host: formValues.host,
          coaches: formValues.coaches,
          speakers: formValues.speakers,
          date: formValues.date,
          startTime: formValues.startTime,
          endTime: formValues.endTime,
          location: formValues.location,
          link: formValues.link,
          sponsors: formValues.sponsors,
          imgUrl: formValues.imgUrl,
          details: formValues.details,
        },
      });
      await navigate(`/createEvent/${eventId}`);
      alert("Successfully updated an event!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputLabel className={classes.inputLabel} htmlFor="type">
        Event Type
      </InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="In Person">In Person</MenuItem>
            <MenuItem value="Webinar">Webinar</MenuItem>
          </Select>
        }
        name="type"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="sportType">
        Sport Type
      </InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="Archery">Archery</MenuItem>
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
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="tags">
        Meta Tags
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="tags"
        ref={register({ required: true, maxLength: 100 })}
        name="tags"
        variant="outlined"
        control={control}
      />
      <InputLabel className={classes.inputLabel} htmlFor="title">
        Event Title
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="title"
        name="title"
        variant="outlined"
        control={control}
        ref={register({ required: true, maxLength: 255 })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="host">
        Who's Hosting the Event?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="host"
        name="host"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="coaches">
        Who's Coaching the Event?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="coaches"
        name="coaches"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="speakers">
        Who's Speaking at the Event?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="speakers"
        name="speakers"
        variant="outlined"
        control={control}
        ref={register({ maxLength: 255 })}
      />
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
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="startTime">
        What time does the event start?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="time"
        placeholder="startTime"
        name="startTime"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="endTime">
        What time does the event end?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="time"
        placeholder="endTime"
        name="endTime"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="location">
        Where is the event location?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="location"
        name="location"
        variant="outlined"
        control={control}
        ref={register({ required: true, maxLength: 255 })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="link">
        Is there a zoom link?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="link"
        name="link"
        variant="outlined"
        control={control}
        ref={register}
      />
      <InputLabel className={classes.inputLabel} htmlFor="sponsors">
        Who are the sponsors?
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="sponsors"
        name="sponsors"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <InputLabel className={classes.inputLabel} htmlFor="imgUrl">
        Find an image on the internet and pase the URL here!
      </InputLabel>
      <Controller
        as={<TextField />}
        type="text"
        placeholder="imgUrl"
        name="imgUrl"
        variant="outlined"
        control={control}
        ref={register}
      />
      <InputLabel className={classes.inputLabel} htmlFor="details">
        Event details
      </InputLabel>
      <Controller
        as={<TextField />}
        name="details"
        variant="outlined"
        multiline
        rows="8"
        control={control}
        ref={register({ required: true, maxLength: 510 })}
      />

      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        type="submit"
        aria-label="Click here to create an event"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </form>
  );
}
