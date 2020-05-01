import React, { useEffect } from 'react'
import { useSubscription } from "react-apollo";
import { CHAT_ROOM_SUBSCRIPTION } from '../../queries/ChatRooms'

import Input from "../Input/Input";
import {
    makeStyles
  } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  messageText: {
    marginTop: "0",
    padding: "0 2%"
  },
  messageSender: {
    marginLeft: "2%",
    color: "#2962FF"
  }
}));

export default function Messages({ user, chatRoom }) {
    const classes = useStyles();

    const messages = chatRoom.chats.map((chat, id) => {return {
        id: id,
        message: chat.message,
        createdAt: chat.createdAt,
        firstName: chat.from.firstName,
        lastName: chat.from.lastName
      }
    });

    return (
        <div>
           {messages.map((message) => (
             <>
              <div className={classes.messageDiv}>
                <span className={classes.messageSender}>{message.firstName} {message.lastName}</span>
                <p className={classes.messageText}>{message.message}</p>
              </div>
             </>
           ))}
           <Input />
        </div>
    )
}



