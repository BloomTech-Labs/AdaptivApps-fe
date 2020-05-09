import React from 'react';
// Material-UI components
import { Modal, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  deleteBtn: {
    background: "#2962FF",
  },
  closeBtn: {
    color: "primary"
  }
});

export default function Modal(props) {
  const classes = useStyles();

  return (
    <Modal classes={classes} {...props}>
      {props.body}
      <Button className={classes.deleteBtn} onClick={props.handleClick}>
        Delete
      </Button>
      <Button className={classes.closeBtn} onClick={props.handleClose}>
        Close
      </Button>
    </Modal>
  );
}
