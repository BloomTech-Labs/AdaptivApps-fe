// React imports
import React from 'react';
import { useForm, Controller } from "react-hook-form";
// Reach Router imports
import { useParams } from '@reach/router';
// Material-UI imports
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

export default function ActivityForm({ createActivity }) {
  const classes = useStyles();
  const { eventId } = useParams();
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = async formValues => {
    console.log(eventId)
    const { data } = await createActivity({
      variables: {
        name: formValues.name,
        type: formValues.type,
        sportType: formValues.sportType,
        coaches: formValues.coaches,
        date: formValues.date,
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
        ref={register({ required: true })}
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
        ref={register({ required: true })}
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
        ref={register({ required: true })}
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
        ref={register({ required: true, maxLength: 255 })}
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
        ref={register({ required: true, maxLength: 255 })}
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
        ref={register({ required: true })}
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
        ref={register({ required: true })}
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
        ref={register({ required: true, maxLength: 255 })}
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
        ref={register}
      />
      <InputLabel className={classes.inputLabel} htmlFor="sponsors">
        Sponsors
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
        ref={register({ required: true, maxLength: 510 })}
      />
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        type="submit"
        aria-label="Click here to add an activity"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </form>
  )
}
