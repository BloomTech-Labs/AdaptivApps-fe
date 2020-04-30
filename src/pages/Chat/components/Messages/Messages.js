import React, { useEffect } from 'react'
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOM_MESSAGES } from '../../queries/ChatRooms';
import {
    makeStyles
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

export default function Messages({ user, chatRoom }) {
    const classes = useStyles();

    const messages = chatRoom.chats.map((chat, id) => {return [
        id,
        chat.message,
        chat.createdAt,
        chat.from.firstName,
        chat.from.lastName
    ]});

    return (
        <div>
           {[messages]}
        </div>
    )
}



