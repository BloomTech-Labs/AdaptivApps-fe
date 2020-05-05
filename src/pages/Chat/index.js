// React imports
import React from "react";

// import NavBar from "./NavBar";
import InfoBar from './components/InfoBar/InfoBar';
import {
  makeStyles
} from "@material-ui/core";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

const useStyles = makeStyles(() => ({
  root: {
    width: "21%",
    height: "100vh",
    padding: "2%",
    marginLeft: "-2rem",
    border: "none",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)",
  }
}));

function ChatFeature(){
  const { user } = useAuth0();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InfoBar user={user} />
    </div>
  )
}
export default ChatFeature;