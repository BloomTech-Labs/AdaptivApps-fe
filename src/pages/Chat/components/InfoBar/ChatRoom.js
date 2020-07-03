import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import Messages from "../Messages/Messages";
import CustomPeopleIcon from "./CustomPeopleIcon";

// Mutation Imports
import { useMutation } from "react-apollo";
import {
  HIDE_CHATROOM_SENDER,
  HIDE_CHATROOM_RECEIVER,
} from "../../queries/ChatRooms";
import { DELETE_NOTIFICATION } from "../../queries/Notifications";

// Style Imports
import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  chatRoomIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
  chatRoomButton: {
    fontSize: "1.6rem",
    border: "none",
    marginLeft: "5%",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    background: "none",
    [theme.breakpoints.down("sm")]: {
      margin: "0",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0",
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
  divider: {
    marginTop: "3%",
    marginBottom: "3%",
  },
  removalBtn: {
    border: "none",
    backgroundColor: "white",
  },
  btn: {
    border: "none",
    background: "none",
    backgroundColor: "none",
  },
}));

export default function ChatRoom({
  results,
  setResults,
  chatRoom,
  user,
  chats,
  chatRoomSub,
  notifications,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [hideChatroomSender] = useMutation(HIDE_CHATROOM_SENDER);
  const [hideChatroomReceiver] = useMutation(HIDE_CHATROOM_RECEIVER);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);
  const [messageToggle, setMessageToggle] = useState(false);
  const [updateChat, setUpdateChat] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

  const roomNotifications = [];
  notifications !== null &&
    notifications.length > 0 &&
    notifications.map(
      notification =>
        notification.chatroom !== null &&
        notification.label !== "Announcement" &&
        notification.chatroom.id === chatRoom.id &&
        roomNotifications.push(notification.id)
    );

  useEffect(() => {
    messageToggle &&
      roomNotifications.length > 0 &&
      roomNotifications.map(notification => {
        deleteNotification({
          variables: {
            id: notification,
          },
        });
      });
  }, [chats, chatRoomSub, notifications, deleteNotification, messageToggle]);

  // Set timeout for automated alerts
  setTimeout(function() {
    if (updateChat) {
      setUpdateChat(false);
    } else if (deleteChat) {
      setDeleteChat(false);
    }
  }, 3000);

  const senderName = chatRoom?.chats?.find(
    chat => chat?.from.email !== user?.email
  );
  const participants = [];

  chatRoom.participants.map(participant => {
    if (
      participant.email !== user.email &&
      participant.firstName !== null &&
      participant.lastName !== null &&
      participant.firstName !== "" &&
      participant.lastName !== ""
    ) {
      participants.push(participant);
    }
  });

  // Logic to set group chat rooms
  let chattingIcon = null;
  let chattingUsername = null;
  const chattingWith = participants.map((participant, index) => {
    if (participants.length === 1 || index === participants.length - 1) {
      chattingUsername = participant.userName;
      chattingIcon = participant.profilePicture;
      return `${participant.firstName} ${participant.lastName}`;
    } else {
      chattingIcon = participant.profilePicture;
      return `${participant.firstName} ${participant.lastName}, `;
    }
  });

  const handleClick = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);

    roomNotifications &&
      roomNotifications.length > 0 &&
      roomNotifications.map(notification => {
        deleteNotification({
          variables: {
            id: notification,
          },
        });
      });
  };

  const closeDrawer = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);
  };

  const removeChatroom = async () => {
    if (chatRoom.senderEmail === user.email) {
      await hideChatroomSender({
        variables: {
          id: chatRoom.id,
        },
      });
    } else {
      await hideChatroomReceiver({
        variables: {
          id: chatRoom.id,
        },
      });
    }
    const newResults = await results.filter(room => room.id !== chatRoom.id);
    setResults(newResults);
  };

  const handleChatroomRemoval = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("removeChatroomIcon");
      button.click();
    }
  };

  return (chatRoom.senderEmail === user.email && chatRoom.displayForSender) ||
    (chatRoom.senderEmail !== user.email && chatRoom.displayForReceiver) ? (
    <>
      <div className={classes.root}>
        <Tooltip title="Visit profile">
          {notifications?.length > 0 && !messageToggle ? (
            <Tooltip title="New Message!">
              <StyledBadge
                badgeContent={roomNotifications.length}
                overlap="circle"
              >
                {chattingIcon ? (
                  <button
                    className={classes.btn}
                    aria-label={`Visit the profile of ${chattingWith}`}
                  >
                    <CustomPeopleIcon
                      className={classes.chatRoomIcon}
                      chattingIcon={chattingIcon}
                      chattingUsername={chattingUsername}
                    />
                  </button>
                ) : (
                  <button
                    className={classes.btn}
                    aria-label={`Visit the profile of ${chattingWith}`}
                  >
                    <PeopleAltIcon
                      className={classes.chatRoomIcon}
                      aria-label="Visit profile"
                      onClick={() => navigate(`/user/${chattingUsername}`)}
                    />
                  </button>
                )}
              </StyledBadge>
            </Tooltip>
          ) : chattingIcon ? (
            <button
              className={classes.btn}
              aria-label={`Visit the profile of ${chattingWith}`}
            >
              <CustomPeopleIcon
                className={classes.chatRoomIcon}
                chattingIcon={chattingIcon}
                chattingUsername={chattingUsername}
              />
            </button>
          ) : (
            <button
              className={classes.btn}
              aria-label={`Visit the profile of ${chattingWith}`}
            >
              <PeopleAltIcon
                className={classes.chatRoomIcon}
                aria-label="Visit profile"
                onClick={() => navigate(`/user/${chattingUsername}`)}
              />
            </button>
          )}
        </Tooltip>
        <Tooltip title="expand chat message">
          <button
            aria-label={`Expand chat messages with ${chattingWith} `}
            className={classes.chatRoomButton}
            onClick={handleClick}
            disabled={disableClick}
          >
            {senderName?.from?.firstName || chattingWith}{" "}
            {senderName?.from?.lastName}
          </button>
        </Tooltip>
        <Tooltip title="Remove Chatroom">
          <button
            aria-label={`Delete chat with ${chattingWith}`}
            className={classes.removalBtn}
            onClick={() => removeChatroom()}
          >
            <CloseIcon
              onKeyDown={e => handleChatroomRemoval(e)}
              aria-label="Remove Chatroom"
              fontSize="small"
              id="removeChatroomIcon"
            />
          </button>
        </Tooltip>
      </div>
      <Hidden only={["md", "lg", "xl"]}>
        <Divider variant="middle" className={classes.divider} />
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Divider variant="inset" className={classes.divider} />
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Drawer
          anchor="right"
          open={messageToggle}
          onClose={closeDrawer}
          variant="temporary"
          PaperProps={{ style: { width: "66%" } }}
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
          </div>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>
              {senderName?.from?.firstName || chattingWith}{" "}
              {senderName?.from?.lastName}
            </h1>
            <Tooltip title="Close Chatroom">
              <button aria-label="Close Chatroom" className={classes.btn}>
                <CloseIcon
                  className={classes.closeModal}
                  onClick={closeDrawer}
                />
              </button>
            </Tooltip>
          </div>
          <Messages
            chatRoom={chatRoom}
            user={user}
            setUpdateChat={setUpdateChat}
            setDeleteChat={setDeleteChat}
          />
        </Drawer>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Drawer
          anchor="right"
          open={messageToggle}
          onClose={closeDrawer}
          variant="temporary"
          PaperProps={{ style: { width: "100%" } }}
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
          </div>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>
              {senderName?.from?.firstName || chattingWith}{" "}
              {senderName?.from?.lastName}
            </h1>
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
          />
        </Drawer>
      </Hidden>
    </>
  ) : null;
}
