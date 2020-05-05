import React, { useState } from 'react';
import Messages from '../Messages/Messages';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
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
  }
}));

export default function ChatRoom({ chatRoom, user, refetch }) {
    const classes = useStyles();
    const [messageToggle, setMessageToggle] = useState(false);

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

    return (
      <>
        <div className={classes.root}>
          <PeopleAltIcon className={classes.chatRoomIcon} />
          <button className={classes.chatRoomButton} onClick={handleClick}>{participants}</button>
        </div>
        <Drawer
          anchor = "right"
          open = {messageToggle}
          variant = "persistent"
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