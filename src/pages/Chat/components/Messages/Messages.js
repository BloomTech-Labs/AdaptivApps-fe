import React from 'react';
import Input from "../Input/Input";
import {
    makeStyles
  } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  }
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
           <Input />
        </div>
    )
}



