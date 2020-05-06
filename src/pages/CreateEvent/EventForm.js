import React from "react";
import { useForm, Controller } from "react-hook-form";

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
}));

export default function EventForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Controller
        as={<TextField />}
        type="text"
        placeholder="tags"
        ref={register({ required: true, maxLength: 100 })}
        name="tags"
        variant="outlined"
        control={control}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="title"
        name="title"
        variant="outlined"
        control={control}
        ref={register({ required: true, maxLength: 255 })}
      />
      <Controller
        as={<TextField />}
        type="search"
        placeholder="host"
        name="host"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="search"
        placeholder="coaches"
        name="coaches"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="speakers"
        name="speakers"
        variant="outlined"
        control={control}
        ref={register({ maxLength: 255 })}
      />
      <Controller
        as={<TextField />}
        type="date"
        placeholder="date"
        name="date"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="time"
        placeholder="startTime"
        name="startTime"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="time"
        placeholder="endTime"
        name="endTime"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="location"
        name="location"
        variant="outlined"
        control={control}
        ref={register({ required: true, maxLength: 255 })}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="link"
        name="link"
        variant="outlined"
        control={control}
        ref={register}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="sponsors"
        name="sponsors"
        variant="outlined"
        control={control}
        ref={register({ required: true })}
      />
      <Controller
        as={<TextField />}
        type="text"
        placeholder="imgUrl"
        name="imgUrl"
        variant="outlined"
        control={control}
        ref={register}
      />
      <Controller
        as={<TextField />}
        name="details"
        variant="outlined"
        control={control}
        ref={register({ required: true, maxLength: 510 })}
      />

      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        type="submit"
        aria-label="Click here to create an event"
        onClick={() => console.log("created an event")}
      >
        Save
      </Button>
    </form>
  );
}
