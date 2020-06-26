import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "@reach/router";
import TagInput from "./TagInput";
import { useQuery, useMutation } from "react-apollo";
import { GET_TAGS, CREATE_TAG } from "./graphql";

import {
  makeStyles,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: "3rem auto",
    border: "1px solid #2962FF",
    color: "#2962FF",
    height: "4rem",
    width: "8rem",
    fontSize: "2.5rem",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  form: { display: "flex", flexDirection: "column", width: "50%" },
  inputLabel: {
    marginBottom: "7px",
    marginLeft: "5px",
  },
  inputField: {
    marginBottom: "10px",
  },
}));

export default function EventForm({
  createEvent,
  updateEvent,
  event,
  loading,
  eventId,
}) {
  const { data: tagsData, refetch: refetchTags } = useQuery(GET_TAGS);
  const [CreateTag] = useMutation(CREATE_TAG);
  const [currentEvent, setCurrentEvent] = useState(event);
  const classes = useStyles();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      type: currentEvent && currentEvent.type,
      sportType: currentEvent && currentEvent.sportType,
      title: currentEvent && currentEvent.title,
      host: currentEvent && currentEvent.host,
      coaches: currentEvent && currentEvent.coaches,
      speakers: currentEvent && currentEvent.speakers,
      startDate: currentEvent && currentEvent.startDate,
      endDate: currentEvent && currentEvent.endDate,
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
        { title: currentEvent && currentEvent.title },
        { host: currentEvent && currentEvent.host },
        { coaches: currentEvent && currentEvent.coaches },
        { speakers: currentEvent && currentEvent.speakers },
        { startDate: currentEvent && currentEvent.startDate },
        { endDate: currentEvent && currentEvent.endDate },
        { startTime: currentEvent && currentEvent.startTime },
        { endTime: currentEvent && currentEvent.endTime },
        { location: currentEvent && currentEvent.location },
        { link: currentEvent && currentEvent.link },
        { sponsors: currentEvent && currentEvent.sponsors },
        { imgUrl: currentEvent && currentEvent.imgUrl },
        { details: currentEvent && currentEvent.details },
      ]);
    }
    if (event) {
      if (event.tags) {
        let eventTags = event.tags.split(", ");
        setTags(eventTags);
      } else {
        setTags(null);
      }
    }
  }, [loading, currentEvent, setValue, event]);

  const createNewTags = () => {
    let tagsInServer = [];
    for (let i = 0; i < tagsData.tags.length; i++) {
      tagsInServer.push(tagsData.tags[i].name);
    }
    for (let j = 0; j < tags?.length; j++) {
      if (!tagsInServer.includes(tags[j])) {
        CreateTag({
          variables: {
            name: tags[j],
          },
        });
      }
    }
  };

  const onSubmit = async (formValues, e) => {
    await createNewTags();
    if (window.location.pathname !== `/editEvent/${eventId}`) {
      const { data } = await createEvent({
        variables: {
          type: formValues.type,
          sportType: formValues.sportType,
          tags: tags && tags.length > 0 ? tags.join(", ") : null,
          title: formValues.title,
          host: formValues.host,
          coaches: formValues.coaches,
          speakers: formValues.speakers,
          startDate: formValues.startDate,
          endDate: formValues.endDate,
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
          tags: tags && tags.length > 0 ? tags.join(", ") : null,
          title: formValues.title,
          host: formValues.host,
          coaches: formValues.coaches,
          speakers: formValues.speakers,
          startDate: formValues.startDate,
          endDate: formValues.endDate,
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

  useEffect(() => {
    refetchTags();
  }, [refetchTags]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <InputLabel className={classes.inputLabel} htmlFor="type">
          Event Type
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="In Person">In Person</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
            </Select>
          }
          name="type"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
        />
        <InputLabel className={classes.inputLabel} htmlFor="sportType">
          Sport Type
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Archery">Archery</MenuItem>
              <MenuItem value="Blind Judo">Blind Judo</MenuItem>
              <MenuItem value="Cheerleading">Cheerleading</MenuItem>
              <MenuItem value="E-Sport">E-Sport</MenuItem>
              <MenuItem value="Goalball">Goalball</MenuItem>
              <MenuItem value="Powerlifting">Powerlifting</MenuItem>
              <MenuItem value="Swimming">Swimming</MenuItem>
              <MenuItem value="Table Tennis">Table Tennis</MenuItem>
              <MenuItem value="Track and Field">Track and Field</MenuItem>
              <MenuItem value="Wheelchair Basketball">
                Wheelchair Basketball
              </MenuItem>
              <MenuItem value="Wheelchair Tennis">Wheelchair Tennis</MenuItem>
              <MenuItem value="Workout">Workout</MenuItem>
            </Select>
          }
          name="sportType"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
        />
        <InputLabel className={classes.inputLabel} htmlFor="startDate">
          Start Date
        </InputLabel>
        <Controller
          as={<TextField />}
          type="date"
          placeholder="Start Date"
          name="startDate"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
        />
        <InputLabel className={classes.inputLabel} htmlFor="endDate">
          End Date
        </InputLabel>
        <Controller
          as={<TextField />}
          type="date"
          placeholder="End Date"
          name="endDate"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
          defaultValue=""
          className={classes.inputField}
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
        />
        <TagInput tags={tags} setTags={setTags} />
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
    </div>
  );
}
