import React, { useEffect } from 'react'
import { useSubscription } from "react-apollo";
import { CHAT_ROOM_SUBSCRIPTION } from '../../queries/ChatRooms'
import {
    makeStyles,
    useTheme,
    Box,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Button,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import CircularProgress from "@material-ui/core/CircularProgress";

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      border: "none",
    },
}));

const Messages = async ({ chatRoom, subscribeToMore }) => {
  const messages = chatRoom.chats.map( chat => {return [
        chat.message,
        chat.createdAt,
        
    ]})

    return (
      <div>
        {messages}
      </div>
    )
  }


    //const classes = useStyles();


  

    // if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    // if (error) return `Error! ${error.message}`;

  

export default Messages;



