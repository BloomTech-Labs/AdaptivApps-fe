import React, { useState } from 'react';
// Material-UI components
import { Modal, Button, makeStyles } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  deleteBtn: {
    background: "#2962FF",
    color: "white"
  },
  closeBtn: {
    color: "primary",
    border: "1px solid #2962FF"
  }
}));

export default function DeleteModal(props) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
    >
      <div style={modalStyle} className={classes.paper}>
        {props.body}
        <Button className={classes.deleteBtn} onClick={props.deleteActivity}>
          Delete
        </Button>
        <Button className={classes.closeBtn} onClick={props.handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

