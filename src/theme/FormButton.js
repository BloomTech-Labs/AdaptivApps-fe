import React from 'react'
// Material-UI imports
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    // marginTop: "2.4rem",
    background: "#2962FF",
    color: "#FFFFFF",
    width: 96,
    height: 48,
    "& .MuiButton-label": {
      fontSize: "2.1rem",
      fontWeight: 500,
    },
    "&:hover": {
      border: "1px solid #2962FF",
      background: "white",
      color: "#2962FF",
    },
  }
})
export default function FormButton({type, ariaLabel, label, onClick}) {
  const classes = useStyles();

  return (
  <Button className={classes.button} type={type} aria-label={ariaLabel} onClick={onClick}>
   {label}
  </Button>
  )
}
