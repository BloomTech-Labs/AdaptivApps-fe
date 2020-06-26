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
  Typography,
  Box
} from "@material-ui/core";

//s3 bucket imports
import S3FileUpload from "react-s3";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles(theme => ({
  button: {
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
    "& .MuiInputLabel-asterisk": {
      fontSize: '1.75rem',
      color: 'red',
      fontWeight: 'bolder'
    },
  },
  inputField: {
    marginBottom: "10px",
  },
  error: {
    color: 'red',
    fontSize: '1.75rem',
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
  },
  disable: {
    margin: '2% auto',
    fontSize: '1.25rem',
    color: 'gray',
    fontWeight: 'bold'
  },
  flex: {
    lineHeight: '5px',
    textAlign: 'center',
    margin: '3rem auto'
  },
  photoIcon: {
    fontSize: "3rem",
    borderRadius: "50%",
    background: "white",
    padding: "2px",
    marginRight: '1rem'
  },
  photoButton: {
   margin: '.5rem 0 .5rem 0'
  },
  input: {
    display: 'none'
  }
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
  const [eventImage, setEventImage] = useState(null)
  const [disableButton, setDisableButton] = useState(false)

  const { handleSubmit, setValue, control, errors } = useForm({
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
        setTags(null)
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
          imgUrl: eventImage,
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
          imgUrl: eventImage === null ? currentEvent.imgUrl : eventImage,
          details: formValues.details,
        },
      });
      await navigate(`/createEvent/${eventId}`);
      alert("Successfully updated an event!");
    }
  };

  //config options for uploading an event image
  const eventImageConfig = {
    bucketName: process.env.REACT_APP_AWS_IMAGE_BUCKET_NAME,
    dirName: `events/${currentEvent?.title}/event_images`,
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  const uploadEventImage = async e => {
    await S3FileUpload.uploadFile(e.target.files[0], eventImageConfig)
    .then(async data => {
      if (data && data?.location) {
        setEventImage(data?.location)
      } else {
        console.log('loading');
      }
    })
    .catch(async err => console.log(err));
  }

  useEffect(() => {
    refetchTags();
    eventImage === null ? setDisableButton(true) : setDisableButton(false);
  }, [refetchTags, eventImage])

  console.log(eventImage)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <InputLabel required className={classes.inputLabel} htmlFor="type">
          Event Type
        </InputLabel>
        {errors.type && <Typography className={classes.error}>Please choose an event type</Typography>}
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
          rules={{ required: true }}
        />
        <InputLabel required className={classes.inputLabel} htmlFor="sportType">
          Sport Type
        </InputLabel>
        {errors.sportType && <Typography className={classes.error}>Please choose a sport type</Typography>}
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
          rules={{ required: true }}
        />
        <InputLabel required className={classes.inputLabel} htmlFor="title">
          Event Title
        </InputLabel>
        {errors.title && <Typography className={classes.error}>Please create an event title</Typography>}
        <Controller
          as={<TextField />}
          type="text"
          placeholder="title"
          name="title"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
        />
        <InputLabel required className={classes.inputLabel} htmlFor="host">
          Who's Hosting the Event?
        </InputLabel>
        {errors.host && <Typography className={classes.error}>Please add a host to this event</Typography>}
        <Controller
          as={<TextField />}
          type="text"
          placeholder="host"
          name="host"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
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
        <InputLabel required className={classes.inputLabel} htmlFor="startDate">
          Start Date
        </InputLabel>
        {errors.startDate && <Typography className={classes.error}>Please choose a start date</Typography>}
        <Controller
          as={<TextField />}
          type="date"
          placeholder="Start Date"
          name="startDate"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
        />
        <InputLabel required className={classes.inputLabel} htmlFor="endDate">
          End Date
        </InputLabel>
        {errors.endDate && <Typography className={classes.error}>Please choose an end date</Typography>}
        <Controller
          as={<TextField />}
          type="date"
          placeholder="End Date"
          name="endDate"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
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
        <InputLabel required className={classes.inputLabel} htmlFor="location">
          Where is the event location?
        </InputLabel>
        {errors.location && <Typography className={classes.error}>Please add an event location</Typography>}
        <Controller
          as={<TextField />}
          type="text"
          placeholder="location"
          name="location"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
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
        <InputLabel required className={classes.inputLabel} htmlFor="sponsors">
          Who are the sponsors?
        </InputLabel>
        {errors.sponsors && <Typography className={classes.error}>Please add an event sponsor</Typography>}
        <Controller
          as={<TextField />}
          type="text"
          placeholder="sponsors"
          name="sponsors"
          variant="outlined"
          control={control}
          defaultValue=""
          className={classes.inputField}
          rules={{ required: true }}
        />
            <label className={classes.photoButton} htmlFor="imgUrl">
                    <IconButton
                      size="medium"
                      aria-label="Upload Profile Picture"
                      component="span"
                    >
                      <PhotoCamera color="primary" className={classes.photoIcon} />
                      <Typography>Choose an image to upload!</Typography>
                    </IconButton>
                  </label>
                  <input
                    className={classes.input}
                    accept="image/*"
                    type="file"
                    onChange={uploadEventImage}
                    id="imgUrl"
                  /> 
        <InputLabel required className={classes.inputLabel} htmlFor="details">
          Event details
        </InputLabel>
        {errors.details && <Typography className={classes.error}>Please add some details to this event</Typography>}
        <Controller
          as={<TextField />}
          name="details"
          variant="outlined"
          multiline
          rows="8"
          control={control}
          rules={{ required: true }}
        />
        <TagInput tags={tags} setTags={setTags} />
        <Box className={classes.flex}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
          aria-label="Click here to create an event"
          onClick={handleSubmit}
          disabled={disableButton}
        >
          Save
        </Button>
        {disableButton && <Typography className={classes.disable}>Button is disabled while uploading photo</Typography>}
        </Box>
      </form>
    </div>
  );
}
