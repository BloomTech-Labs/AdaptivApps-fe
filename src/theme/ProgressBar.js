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
    width: 744,
    '& .MuiPaper-root': {
      background: '#FFFFFF'
    },
  },
  stepper: {
    width: '100%',
    marginLeft: -4,
  },
  backBtn: {
    padding: 0,
    display: 'flex',
    alignContent: 'flex-start'
  },
  btnLabel: {
    textAlign: 'left'
  },
  actionBox: {
    width: 744,
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '1.2rem'
    },
    marginLeft: -8
  }
});

export default function ProgressBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Box className={classes.root}>
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        // nextButton={
        //   <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
        //     Next
        //     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        //     Back
        //   </Button>
        // }
      />
      <Box className={classes.actionBox}>
        <Button size="small" onClick={handleBack} className={classes.backBtn}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          <Typography className={classes.btnLabel}>Back</Typography>
        </Button>
        <Typography>1 of 6</Typography>
      </Box>
    </Box>
  );
}
