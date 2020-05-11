import React, { useState } from 'react';

import Messages from '../Messages/Messages';

import { useMutation } from "react-apollo";
import { DELETE_CHAT_ROOM } from '../../queries/ChatRooms'

// Style Imports
import Tooltip from '@material-ui/core/Tooltip';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import {
  makeStyles
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {   
    margin: ".5rem auto",
    display: 'flex',
    whiteSpace: "nowrap",
    overflow: 'hidden'
  },
  chatRoomIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 5%",
    '&:hover': {
      cursor: 'pointer'
    }
  },
  chatRoomButton: {
    fontSize: "1.6rem",
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF",
    }, 
    '&:focus': {
      outline: "none"
    }
  },
  closeModal: {
    fontSize: "3rem",
    marginTop: '1%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    }, 
    '&:focus': {
      outline: "none"
    }
  },
  roomTitle: {
    fontSize: '2rem',
    color: '#2962FF'
  },
  titleDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1% 2% 0 2%',
    borderBottom: '1px solid grey'
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
    padding: '1%',
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

export default function ChatRoom({ chatRoom, user, setDeleteRoom }) {
    const classes = useStyles();
    const [deleteChatRoom] = useMutation(DELETE_CHAT_ROOM);

    const [messageToggle, setMessageToggle] = useState(false);
    const [editChatRoom, setEditChatRoom] = useState(false)

    const participants = chatRoom.participants.filter((participant) => participant.email !== user.email && participant)

    const chattingWith = participants.map((participant, index) => {
      if (participants.length === 1 || index === participants.length - 1) {
        return `${participant.firstName} ${participant.lastName}`
        } else {
        return `${participant.firstName} ${participant.lastName}, `
        }
      })

    const messages = chatRoom.chats.map((chat, id) => {return {
        id: id,
        message: chat.message,
        createdAt: chat.createdAt,
        firstName: chat.from.firstName,
        lastName: chat.from.lastName,
        sender: chat.from.email
      }
    });

    const handleClick = e => {
      e.preventDefault();
      messageToggle ? setMessageToggle(false) : setMessageToggle(true)
    };

    const closeDrawer = e => {
      e.preventDefault();
      messageToggle ? setMessageToggle(false) : setMessageToggle(true)
    };

    const deleteRoom = async () => {
      await deleteChatRoom({
          variables: {
              id: chatRoom.id
          }
      })
      setEditChatRoom(false);
      setDeleteRoom(true);
  }

    return (
      <>
        <div className={classes.root}>
          <Tooltip title="Click to Delete Chatroom">
            <PeopleAltIcon 
              className={classes.chatRoomIcon}
              onClick={() => setEditChatRoom(true)}/>
          </Tooltip>
          <Modal
            participants={participants}
            position="relative"
            top="10%"
            left="13%"
            open={editChatRoom}
            onClose={() => setEditChatRoom(false)}>
            {editChatRoom ? (
            <div className={classes.paper}>
              <Tooltip title="Cancel">
                <CloseIcon className={classes.cancelChatDelete} onClick={() => setEditChatRoom(false)} />
              </Tooltip>
              <p className={classes.span}>Delete Chat with {chattingWith}?</p>
              <Tooltip title="Confirm Delete">
                <CheckCircleOutlineIcon className={classes.deleteChat} onClick={deleteRoom}/>
              </Tooltip>
            </div>) : null}
          </Modal>          
          <Tooltip title="Click to expand messages">
            <button 
              className={classes.chatRoomButton} 
              onClick={handleClick}>{chattingWith}</button>
          </Tooltip>
        </div>
        <Drawer
          anchor = "right"
          open = {messageToggle}
          onClose={handleClick}
          variant = "temporary"
          PaperProps = {{ style: { width: "66%" } }}>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>{chattingWith}</h1>
            <CloseIcon className={classes.closeModal} onClick={closeDrawer} />
          </div>
          <Messages chatRoom={chatRoom} participants={participants} user={user} messages={messages} />
        </Drawer>
      </>
    )
}