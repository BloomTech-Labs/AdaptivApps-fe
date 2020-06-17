// React imports
import React from "react";
// Material-UI imports
import {
  makeStyles,
  useTheme,
  MobileStepper,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 744,
    "& .MuiPaper-root": {
      background: "#FFFFFF",
    },
  },
  stepper: {
    width: "100%",
    marginLeft: -4,
    "& .MuiLinearProgress-root": {
      width: "100%",
    },
  },
  backBtn: {
    padding: 0,
    display: "flex",
    textTransform: "none",
    alignContent: "flex-start",
  },
  btnLabel: {
    textAlign: "left",
  },
  actionBox: {
    width: 744,
    display: "flex",
    justifyContent: "space-between",
    "& p": {
      fontSize: "1.2rem",
    },
    marginLeft: -11,
  },
});

export default function ProgressBar({ activeStep, userEmail, stepNumber }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
      />
      <Box className={classes.actionBox}>
        <Button size="small" className={classes.backBtn}>
          {/* {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          <Typography className={classes.btnLabel}>Back</Typography> */}
        </Button>
        {window.location.pathname !== `/updateaccount/${userEmail}` ? (
          <Typography>{`${stepNumber} of 6`}</Typography>
        ) : null}
      </Box>
    </Box>
  );
}
