import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

import {
  makeStyles,
  InputLabel,
  Input,
  Button,
  Paper,
  Chip
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  form: { display: "flex", flexDirection: "column", width: "400px" },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  btn: {
    display: "flex",
    height: "100%",
    width: "30px",
    background: "transparent",
    boxShadow: "none",
    border: "none",
    margin: "0",
    padding: "0",
    "&:hover": {
      background: "none",
      boxShadow: "none",
    }
  }
}));

export default function TagInput(props) {
  const { tags, setTags } = props;
  const [currentTag, setCurrentTag] = useState("");
  const classes = useStyles();

  const handleChange = e => {
    setCurrentTag(e.target.value.toLowerCase());
  }

  const handleSubmit = async () => {
    if (tags) {
      await setTags([...tags, currentTag])
    } else {
      await setTags([currentTag])
    }
    setCurrentTag("");
  }

  const handleDelete = async tag => {
    let temp = tags.filter(item => item !== tag)
    await setTags(temp);
  }

  return (
    <div>
      <InputLabel className={classes.inputLabel} htmlFor="tags">
        Meta Tags
            </InputLabel>
      {tags && tags.length > 0 ? <Paper component="ul" className={classes.paper}>
        {tags && tags.map(tag => {
          return (
            <li key={tag.length}>
              <Chip
                label={tag}
                className={classes.chip}
                onDelete={() => handleDelete(tag)}
              />
            </li>
          )
        })}
      </Paper> : null}
      <Input
        className={classes.search}
        placeholder="Add a tag"
        onChange={handleChange}
        value={currentTag}
      />
      <Button
        className={classes.btn}
        variant="contained"
        onClick={handleSubmit}
      >
        <IoIosAddCircle style={{ "fontSize": "25px" }} />
      </Button>
    </div>
  )
}
