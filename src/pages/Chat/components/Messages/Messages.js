import React, { useState, useEffect, useRef } from 'react';
import Input from "../Input/Input";
import EditInput from '../Input/EditInput';

// Update / Delete Mutations
import { useMutation } from 'react-apollo';
import { DELETE_CHAT } from '../../queries/Chats';

import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
    padding: '1%',
    display: 'flex',
    justifyContent: 'space-between'
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
  messageBoxRight: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    marginTop: '1.5%',
  },
  messageSender: {
    backgroundColor: 'rgba(196, 196, 196, 0.25)',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '50%',
    borderRadius: '8px'
  },
  userMessage: {
    backgroundColor: 'rgba(41, 98, 255, 0.11)',
    padding: '1% 2%',
    fontSize: '1.5rem',
    width: '50%',
    borderRadius: '8px'
  },
  messageIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 3%",
    border: '1px solid #2962FF',
    borderRadius: '50px'
  },
  deleteMessageIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 3%",
    border: '1px solid #2962FF',
    borderRadius: '50px',
    '&:hover': {
      cursor: 'pointer',
      color: 'red'
    }
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
  },
  editIcon: {
    '&:hover': {
      cursor: 'pointer',
      color: '#2962FF'
    }
  },
  paper: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    position: 'absolute',
    top: '25%',
    left: '40%',
    width: '25%',
    borderRadius: '5px',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '1%',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
  span: {
    fontSize: '2rem',
    color: '#2962FF',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: '0%'
  },
  cancelChatDelete: {
    fontSize: "2rem",
    marginLeft: '95%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    }, 
    '&:focus': {
      outline: "none"
    }
  },
  deleteChat: {
    fontSize: '4rem',
    color: 'green',
    margin: '2% 0%',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default function Messages({ user, chatRoom, participants, messages, setUpdateChat, setDeleteChat }) {
  const classes = useStyles();
  
  const [deleteChat] = useMutation(DELETE_CHAT);

  const [messageToEdit, setMessageToEdit] = useState();
  const [editInput, setEditInput] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const deleteMessage = async (message) => {
    await deleteChat({ variables: { id: message.id } });
    setDeleteChat(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.messageDiv}>
        {messages.map((message) => (
          <>
            <div key={message.id} className={message.sender !== user.email ? classes.messageBox : classes.messageBoxRight}>
              {message.sender === user.email ? (
                <Tooltip title="Delete Message">
                  <PersonIcon className={classes.deleteMessageIcon} onClick={() => deleteMessage(message)} />
                </Tooltip>
              ) : (
                <PersonIcon className={classes.messageIcon} />
              )}
              <div className={message.sender !== user.email ?
                  classes.messageSender : classes.userMessage}>
                <div className={classes.messageHeader}>
                  {message.sender === user.email ? <span className={classes.sender}>Me</span> : <span className={classes.sender}>{message.firstName} {message.lastName}</span> }
                  {message.sender === user.email ? (
                  <Tooltip title="Edit Message">
                    <EditOutlinedIcon className={classes.editIcon} onClick={() => {setEditInput(true); setMessageToEdit(message)}} />
                  </Tooltip>) : null}
                </div>
                <p className={classes.messageText}>{message.message}</p>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </>
        ))}
      </div>
      <div className={classes.inputDiv}>
        {editInput ? (
          <EditInput chatRoom={chatRoom} messageToEdit={messageToEdit} setUpdateChat={setUpdateChat} setEditInput={setEditInput} />
        ) : (
          <Input chatRoom={chatRoom} user={user} />
        )}
      </div>
    </div>
  )
}
