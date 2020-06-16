import React, { useState, useEffect } from "react";
import Messages from "../Messages/Messages";

// Mutation Imports
import { useMutation } from "react-apollo";
import { DELETE_CHAT_ROOM_PARTICIPANTS } from "../../queries/ChatRooms";

// Style Imports
import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core";

const StyledBadge = withStyles(theme => ({
  badge: {
    left: -10,
    top: 10,
    width: "2%",
    backgroundColor: "#052942",
    color: "white",
    fontSize: "1.25rem",
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    margin: ".5rem auto",
    display: "flex",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  chatRoomIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    margin: "0 5%",
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
  chatRoomButton: {
    fontSize: "1.6rem",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  closeModal: {
    fontSize: "3rem",
    marginTop: "1%",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  roomTitle: {
    fontSize: "2rem",
    color: "#2962FF",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1% 2% 0 2%",
    borderBottom: "1px solid grey",
  },
  paper: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    backgroundColor: "whitesmoke",
    position: "absolute",
    top: "25%",
    left: "40%",
    width: "25%",
    borderRadius: "5px",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "1%",
    fontSize: "2.5rem",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    "&:focus": {
      outline: "none",
    },
  },
  span: {
    fontSize: "2rem",
    color: "#2962FF",
    textAlign: "center",
    fontWeight: "normal",
    marginTop: "0%",
  },
  cancelChatDelete: {
    fontSize: "2rem",
    marginLeft: "95%",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  deleteChat: {
    fontSize: "4rem",
    color: "green",
    margin: "2% 0%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  alertDiv: {
    width: "100%",
    margin: "0",
  },
  badge: {
    color: "#052942",
  },
}));

export default function ChatRoom({ chatRoom, user, setDeleteRoom, chats, chatRoomSub }) {
  const classes = useStyles();

  const [deleteChatRoom] = useMutation(DELETE_CHAT_ROOM_PARTICIPANTS);
  const [messageToggle, setMessageToggle] = useState(false);
  const [roomNotifications, setRoomNotifications] = useState([])
  const [editChatRoom, setEditChatRoom] = useState(false);
  const [updateChat, setUpdateChat] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    //if (
    !messageToggle &&
    chats?.chat?.mutation === 'CREATED' && 
    !chatRoomSub?.chatRoom?.mutation &&
    chats?.chat?.node.from.email !== user.email &&
    chats?.chat?.node.room.id === chatRoom.id &&
    roomNotifications.push(chats?.chat?.node?.room.id) 
    // } else if (!messageToggle &&
    // chats?.chat?.mutation === 'CREATED' &&
    // chatRoomSub?.chatRoom?.mutation === 'UPDATED' &&
    // chats?.chat?.node.from.email !== user.email &&
    // chatRoomSub?.chatRoom?.node?.id === chatRoom.id ) {
    // roomNotifications.push(chatRoomSub?.chatRoom?.node?.id)
    // }

  }, [chats, chatRoomSub, roomNotifications])
  
console.log(chatRoomSub)

  // Set timeout for automated alerts
  setTimeout(function() {
    if (updateChat) {
      setUpdateChat(false);
    } else if (deleteChat) {
      setDeleteChat(false);
    }
  }, 3000);

  const senderName = chatRoom?.chats?.find(chat => chat?.from.email !== user?.email)

  const participants = []

    chatRoom.participants.map((participant) => {
      if (participant.email !== user.email &&
          participant.firstName !== null && participant.lastName !== null &&
          participant.firstName !== "" && participant.lastName !== "") {
            participants.push(participant)
      }
    })   

    // Logic to set group chat rooms
    const chattingWith = participants.map((participant, index) => {
      if (participants.length === 1 || index === participants.length - 1) {
        return `${participant.firstName} ${participant.lastName}`
      } else {
        return `${participant.firstName} ${participant.lastName}, `
      }
    });

  const handleClick = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);
    setRoomNotifications([]);
  };

  const closeDrawer = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);
  };

  // Delete a chat room
  const deleteRoom = async () => {
    await deleteChatRoom({
      variables: {
        email: user.email,
        id: chatRoom.id
      },
    });
    setEditChatRoom(false);
    setDeleteRoom(true);
  };

  return (
    <>
      <div className={classes.root}>
        <Tooltip title="Click to Delete Chatroom">
          {roomNotifications?.length > 0 ? (
            <Tooltip title="New Message!">
              <StyledBadge
                badgeContent={roomNotifications.length}
                overlap="circle"
              >
                <PeopleAltIcon
                  className={classes.chatRoomIcon}
                  onClick={() => setEditChatRoom(true)}
                  aria-label="Delete selected Chatroom"
                />
              </StyledBadge>
            </Tooltip>
          ) : (
            <PeopleAltIcon
              className={classes.chatRoomIcon}
              onClick={() => setEditChatRoom(true)}
              aria-label="Delete selected Chatroom"
            />
          )}
        </Tooltip>
        <Modal
          position="relative"
          top="10%"
          left="13%"
          open={editChatRoom}
          onClose={() => setEditChatRoom(false)}
        >
          {editChatRoom ? (
            <div className={classes.paper}>
              <Tooltip title="Cancel">
                <CloseIcon
                  className={classes.cancelChatDelete}
                  onClick={() => setEditChatRoom(false)}
                  aria-label="Cancel Delete"
                />
              </Tooltip>
              <p className={classes.span}>Delete Chat with {senderName?.from?.firstName || chattingWith} {senderName?.from?.lastName}?</p>
              <Tooltip title="Confirm Delete">
                <CheckCircleOutlineIcon
                  className={classes.deleteChat}
                  onClick={deleteRoom}
                  aria-label="Confirm Delete"
                />
              </Tooltip>
            </div>
          ) : null}
        </Modal>
            
        <button
          aria-label="Expand chat messages"
          className={classes.chatRoomButton}
          onClick={handleClick}
          disabled={disableClick}
        >
          {senderName?.from?.firstName || chattingWith} {senderName?.from?.lastName}
        </button>
      </div>
      <Drawer
        anchor="right"
        open={messageToggle}
        onClose={closeDrawer}
        variant="temporary"
        PaperProps={{ style: { width: "66%", } }}
      >
        <div className={classes.alertDiv}>
          <Collapse in={updateChat}>
            <Alert
              severity="success"
              color="info"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setUpdateChat(false);
                  }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              }
            >
              Successfully updated
            </Alert>
          </Collapse>
          <Collapse in={deleteChat}>
            <Alert
              severity="success"
              color="info"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setDeleteChat(false);
                  }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              }
            >
              Successfully deleted
            </Alert>
          </Collapse>
        </div>
        <div className={classes.titleDiv}>
          <h1 className={classes.roomTitle}>{senderName?.from?.firstName || chattingWith} {senderName?.from?.lastName}</h1>
          <Tooltip title="Close Chatroom">
            <CloseIcon
              className={classes.closeModal}
              onClick={closeDrawer}
              aria-label="Close Chatroom"
            />
          </Tooltip>
        </div>
        <Messages
          chatRoom={chatRoom}
          user={user}
          setUpdateChat={setUpdateChat}
          setDeleteChat={setDeleteChat}
          roomNotifications={roomNotifications}
        />
      </Drawer>
    </>
  );
}
