// React & Reach Router imports
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from '@reach/router';
// Component imports
import LightTooltip from '../../theme/LightTooltip'
// Material-UI imports
import {
  makeStyles,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Box
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
  },
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

export default function ActivityForm({ data, createActivity, eventId, refetch }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, control } = useForm();
  
  const onSubmit = async formValues => {
    await createActivity({
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
    await refetch();
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
      <Box>
        <LightTooltip title="Add Activity">
          <Button
          className={classes.button}
          variant="outlined"
          type="submit"
          aria-label="Click here to add an activity"
          onClick={handleSubmit}
          >
            Add
          </Button>
        </LightTooltip>
        <LightTooltip title="Finish Event Creation">
          <Button
          className={classes.button}
          variant="outlined"
          aria-label="Click here to finish event creation"
          onClick={()=>navigate(`/calendar/${eventId}`)}
          >
            Finish
          </Button>
        </LightTooltip>
      </Box>
    </form>
  )
}
