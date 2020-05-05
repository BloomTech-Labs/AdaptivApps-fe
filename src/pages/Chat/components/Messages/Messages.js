import React from 'react';
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
    marginBottom: '4%',
    padding: '1%'
  },
  sender: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  messageBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1.5%',
   
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
feature/handle_null_wrap_input
  inputDiv: {
    width: '100%',
    height: '7.5vh',
    marginTop: '2%',
    position: 'absolute',
    bottom: "0"

  header: {
    fontSize: '2rem',
    marginLeft: '4%'
    master
  }
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
 feature/handle_null_wrap_input
      <div className={classes.root}>
        <div>
          {messages.map((message) => (
            <>
              <div key={message.id} className={classes.messageBox}>
                <PeopleAltIcon className={classes.messageIcon} />
                <div className={message.sender !== user.email ?
                    classes.messageSender : classes.userMessage}>
                  <div className={classes.messageHeader}>
                    {message.sender === user.email ? <span className={classes.sender}>Me</span> : <span className={classes.sender}>{message.firstName} {message.lastName}</span> }
                  </div>
                  <p className={classes.messageText}>{message.message}</p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className={classes.inputDiv}>
          <Input />
        </div>
      </div>

        <div className={classes.root}>
          <h1 className={classes.header}>Message with {participants}</h1>
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
           <Input user={user} chatRoom={chatRoom} messages={messages}/>
        </div>
        
 master
    )
}