import React from 'react';
import { Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "#FFC629",
    color: "#2962FF",
    fontSize: 14,
    fontWeight: "bold"
  },
});

export default function LightTooltip(props) {
  const classes = useStyles();

  return <Tooltip classes={classes} {...props} />;
}


