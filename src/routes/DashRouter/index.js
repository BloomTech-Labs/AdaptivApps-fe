// React imports
import React from "react";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Component imports
import SideNav from "./SideNav";
// Styling imports
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    backgroundColor: "#FFFFFF",
  },
  box: {
    marginLeft: "2rem",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

const DashRouter = ({ children }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  return (
    <div className={classes.root}>
      <SideNav user={user} />
      <div>
        <Box className={classes.box} style={{ "position": "absolute" }}>{children}</Box>
      </div>
    </div>
  );
};

export default DashRouter;

