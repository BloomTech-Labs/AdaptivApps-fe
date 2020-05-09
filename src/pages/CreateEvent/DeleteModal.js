import React from 'react';
// Material-UI components
import { Modal, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  modal: {
    backgroundColor: "#FFC629",
    fontSize: 14,
    fontWeight: "bold"
  },
});

export default function DeleteModal(props) {
  const classes = useStyles();

  return <Modal classes={classes} {...props} />;
}
