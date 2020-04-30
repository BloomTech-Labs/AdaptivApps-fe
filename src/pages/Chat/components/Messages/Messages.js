import React, { useEffect } from 'react'
import { useQuery } from "react-apollo";
import { GET_CHAT_ROOM_MESSAGES } from '../../queries/ChatRooms';
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

export default function Messages({ user, chatRoom }) {
    const classes = useStyles();
    //const { loading, error, data, refetch } = useQuery(GET_CHAT_ROOM_MESSAGES, { variables: { email: user.email } });

    // refetches CHAT_ROOM_MESSAGES without refreshing page
    // useEffect(() => {
    //     refetch();
    // }, [refetch]);

    const messages = chatRoom.chats.map((chat, id) => {return [
        id,
        chat.message,
        chat.createdAt,
        chat.from.firstName,
        chat.from.lastName
    ]})

    console.log(messages);

    // if (loading) return <CircularProgress className={classes.loadingSpinner} />;
    // if (error) return `Error! ${error.message}`;

    return (
        <div>
           {[messages]}
        </div>
    )
}



