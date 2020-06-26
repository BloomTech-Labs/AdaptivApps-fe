import React, { useState } from "react";
// Material-UI components
import { Modal, Button, Box, Paper, Typography, makeStyles } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    minHeight: 320, 
    minWidth: 320,
    maxWidth: 400,
    maxHeight: 568,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "column",
  },
  btnBox: {
    paddingLeft: "1.4rem",
    marginTop: "0.8rem"
  },
  deleteBtn: {
    width: 96,
    height: 48,
    margin: theme.spacing(1),
    background: "#2962FF",
    
    fontWeight: 500,
    color: "white",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
    "&:hover": {
      border: "1px solid #2962FF",
      background: "white",
      color: "#2962FF",
    },
    textTransform: "capitalize"
  },
  closeBtn: {
    width: 96,
    height: 48,
    margin: "1rem 1rem 1rem 3rem",
    color: "#2962FF",
    fontSize: "1.6rem",
    fontWeight: 500,
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
    border: "1px solid #2962FF",
    "&:hover": {
      color: "white",
      background: "#2962FF",
    },
    textTransform: "capitalize"
  },
}));

export default function DeleteModal(props) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
    >
      <Paper style={modalStyle} className={classes.paper}>
         {props.body}
        <Box className={classes.btnBox}>
          <Button className={classes.deleteBtn} onClick={props.onClick}>
            Delete
          </Button>
          <Button className={classes.closeBtn} onClick={props.handleClose}>
            Close
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
