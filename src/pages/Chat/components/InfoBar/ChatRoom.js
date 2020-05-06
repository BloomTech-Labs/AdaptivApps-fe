import React, { useState } from 'react';

import Messages from '../Messages/Messages';

import { useMutation } from "react-apollo";
import { DELETE_CHAT_ROOM } from '../../queries/ChatRooms'

// Style Imports
import Tooltip from '@material-ui/core/Tooltip';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import {
  makeStyles
} from "@material-ui/core";
const useStyles = makeStyles(() => ({
  root: {   
    margin: ".5rem auto",
    display: 'flex',
    whiteSpace: "nowrap",
    overflow: 'hidden'
  },
  chatRoomIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 5%"
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
  modal: {
    position: 'fixed',
    top: '20%',
    left: '20%',
    fontSize: "-webkit-xxx-large",
}
}));

export default function ChatRoom({ chatRoom, user, refetch }) {
    const classes = useStyles();
    const [deleteChatRoom] = useMutation(DELETE_CHAT_ROOM);

    const [messageToggle, setMessageToggle] = useState(false);
    const [editChatRoom, setEditChatRoom] = useState(false)

    const participants = chatRoom.participants.map((participant) =>
    (chatRoom.participants.length > 2 ? 
      participant.email !== user.email && `${participant.firstName} ${participant.lastName}, ` 
      : 
      participant.email !== user.email && `${participant.firstName} ${participant.lastName}`));

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
  }

    return (
      <>
        <div className={classes.root}>
          <Tooltip title="Click to Edit Chatroom">
            <PeopleAltIcon 
              className={classes.chatRoomIcon}
              onClick={() => setEditChatRoom(true)}/>
          </Tooltip>
              <Modal
                className={classes.modal}
                open={editChatRoom}
                onClose={() => setEditChatRoom(false)}>
                {editChatRoom ? <div>hello</div> : null}
              </Modal>          
          <Tooltip title="Click to expand messages">
            <button 
              className={classes.chatRoomButton} 
              onClick={handleClick}>{participants}</button>
          </Tooltip>
        </div>
        <Drawer
          anchor = "right"
          open = {messageToggle}
          onClose={handleClick}
          variant = "temporary"
          PaperProps = {{ style: { width: "66%" } }}>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>{participants}</h1>
            <CloseIcon className={classes.closeModal} onClick={closeDrawer} />
          </div>
          <Messages chatRoom={chatRoom} participants={participants} user={user} refetch={refetch} />
        </Drawer>
      </>
    )
}