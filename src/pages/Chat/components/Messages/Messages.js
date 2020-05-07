import React, { useEffect, useRef } from 'react';
import Input from "../Input/Input";
import PersonIcon from '@material-ui/icons/Person';
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
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '40%',
    borderRadius: '8px'
  },
  userMessage: {
    backgroundColor: '#2962ff51',
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
  inputDiv: {
    width: '100%',
    height: '7.5vh',
    marginTop: '2%',
    position: 'absolute',
    bottom: "0"
  },
  messageDiv: {
    maxHeight: '80vh',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  header: {
    fontSize: '2rem',
    marginLeft: '4%'
  }
}));

export default function Messages({ user, chatRoom, participants, messages }) {
  const classes = useStyles();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  

  return (
    <div className={classes.root}>
      <div className={classes.messageDiv}>
        {messages.map((message) => (
          <>
            <div key={message.id} className={classes.messageBox}>
              <PersonIcon className={classes.messageIcon} />
              <div className={message.sender !== user.email ?
                  classes.messageSender : classes.userMessage}>
                <div className={classes.messageHeader}>
                  {message.sender === user.email ? <span className={classes.sender}>Me</span> : <span className={classes.sender}>{message.firstName} {message.lastName}</span> }
                </div>
                <p className={classes.messageText}>{message.message}</p>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </>
        ))}
      </div>
      <div className={classes.inputDiv}>
        <Input chatRoom={chatRoom} user={user} participants={participants}/>
      </div>
    </div>
  )
}
