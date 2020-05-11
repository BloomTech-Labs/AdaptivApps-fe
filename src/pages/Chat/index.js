// React imports
import React, { useState } from "react";

import InfoBar from './components/InfoBar/InfoBar';

import {
  makeStyles
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';

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
  },
  alertDiv: {
    width: '102%',
    margin: '0 -2%'
  }
}));

function ChatFeature(){
  const { user } = useAuth0();
  const classes = useStyles();
  const [alert, setAlertOpen] = useState(true);

  return (
    <>
      <div className={classes.alertDiv}>
        <Collapse in={alert}>
          <Alert
            severity="success"
            color="info"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}>
                <CloseIcon fontSize="3rem" />
              </IconButton>
            }>
            Successfully sent announcement
          </Alert>
        </Collapse>
      </div>
      <div className={classes.root}>
        <InfoBar user={user} setAlertOpen={setAlertOpen} />
      </div>
    </>
  )
}
export default ChatFeature;