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
  const [alert, setAlertOpen] = useState(false);
  const [newRoom, setNewRoom] = useState(false);
  const [updateChat, setUpdateChat] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);

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

        <Collapse in={newRoom}>
          <Alert
            severity="success"
            color="info"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setNewRoom(false);
                }}>
                <CloseIcon fontSize="3rem" />
              </IconButton>
            }>
            Successfully created chat room
          </Alert>
        </Collapse>

        <Collapse in={updateChat}>
          <Alert
            severity="success"
            color="info"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setNewRoom(false);
                }}>
                <CloseIcon fontSize="3rem" />
              </IconButton>
            }>
            Successfully updated
          </Alert>
        </Collapse>

        <Collapse in={deleteRoom}>
          <Alert
            severity="success"
            color="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setDeleteRoom(false);
                }}>
                <CloseIcon fontSize="3rem" />
              </IconButton>
            }>
            Successfully deleted chat room
          </Alert>
        </Collapse>

        <Collapse in={deleteChat}>
          <Alert
            severity="success"
            color="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setDeleteChat(false);
                }}>
                <CloseIcon fontSize="3rem" />
              </IconButton>
            }>
            Successfully deleted
          </Alert>
        </Collapse>
      </div>
      <div className={classes.root}>
        <InfoBar user={user} setAlertOpen={setAlertOpen} setNewRoom={setNewRoom} setUpdateChat={setUpdateChat} setDeleteRoom={setDeleteRoom} setDeleteChat={setDeleteChat} />
      </div>
    </>
  )
}
export default ChatFeature;