import React from 'react';
import {
    makeStyles
  } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
    maxWidth: '95%',
    marginLeft: '1%'
  },
  messageText: {
    marginTop: "0",
    padding: "0 2%",
    fontSize: '1.5rem'
  },
  messageHeader: {
    marginBottom: '2%',
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
    marginLeft: '3%',
    width: '97%'
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
    width: '100%',
    borderRadius: '8px'
  },
  messageDiv: {
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 8%'
  },
  header: {
    fontSize: '2rem',
    marginLeft: '4%'
  }
}));

export default function Messages({ chatRoom }) {
  const classes = useStyles();

  // Query for Announcement messages after BE is setup...change messages map, message, title, and change chatRoom prop name

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
      <div className={classes.messageDiv}>
        {messages.map((message) => (
          <>
            <div key={message.id} className={classes.messageBox}>
              <div className={classes.userMessage}>
                <div className={classes.messageHeader}>
                  <p className={classes.sender}><strong>From:</strong> ACS Admin</p>
                  <p className={classes.sender}><strong>Title:</strong> Announcement Title</p>
                </div>
                <p className={classes.messageText}>{message.message}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}