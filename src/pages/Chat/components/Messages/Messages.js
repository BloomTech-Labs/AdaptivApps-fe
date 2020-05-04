import React, { useEffect } from 'react';
import Input from "../Input/Input";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    makeStyles
  } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
    maxWidth: '95%'
  },
  messageText: {
    marginTop: "0",
    padding: "0 2%",
    fontSize: '1.5rem'
  },
  messageHeader: {
    fontSize: '1.5rem',
    marginLeft: '2%'
  },
  messageBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3%'
  },
  messageSender: {
    backgroundColor: '#C4C4C480',
    lineHeight: '8px',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '40%',
    borderRadius: '8px'
  },
  userMessage: {
    backgroundColor: '#2962ff51',
    lineHeight: '8px',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '40%',
    borderRadius: '8px'
  },
  messageIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 5%"
  },
}));

export default function Messages({ user, chatRoom, participants }) {
    const classes = useStyles();
    const messages = chatRoom.chats.map((chat, id) => {return {
        id: id,
        message: chat.message,
        createdAt: chat.createdAt,
        firstName: chat.from.firstName,
        lastName: chat.from.lastName,
        sender: chat.from.email
      }
    });

    return (
      <div className={classes.root}>
        <h1>Message with {participants}</h1>
          {messages.map((message) => (
            <>
            <div className={classes.messageBox}>
            <PeopleAltIcon className={classes.messageIcon} />
            <div className={message.sender !== user.email ?
                classes.messageSender : classes.userMessage}>
              <h3 className={classes.messageHeader}>{message.firstName} {message.lastName}</h3>
              <p className={classes.messageText}>{message.message}</p>
            </div>
            </div>
            </>
          ))}
          <Input />
      </div>
    )
}