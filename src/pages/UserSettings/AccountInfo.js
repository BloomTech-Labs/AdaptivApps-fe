// React/Reach Router imports
import React from "react";
import { useNavigate } from "@reach/router";
// Component imports
import NextButton from '../../theme/NextButton';
// Material-UI imports
import {
  makeStyles,
  Typography,
  Container,
  Box,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
});

export default function AccountInfo() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1">Update Account Information</Typography>
      </Box>
      <NextButton
        aria-label="Click here to complete step 1 of update account information."
        onClick={() => navigate(`/step1`)}
      />
    </Container>
  );
}
