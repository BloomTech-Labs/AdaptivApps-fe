import React, { useState } from "react";
import RecipientModal from "../Modals/Modal";
import ChatRoom from "./ChatRoom";

// Query / Mutation / Subscription Imports
import { useQuery, useSubscription } from "react-apollo";
import { GET_CHAT_ROOMS, CHAT_ROOM_SUBSCRIPTION } from '../../queries/ChatRooms'
import { CHAT_SUBSCRIPTION } from '../../queries/Chats'
import { GET_NOTIFICATIONS, NOTIFICATION_SUBSCRIPTION } from '../../queries/Notifications'
// Style Imports
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, Box, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "normal",
    color: "#2962FF",
    fontFamily: "Arial",
    marginBottom: "10%",
    marginTop: "1%",
  },
  messageIcons: {
    maxWidth: "95%",
    display: "flex",
    margin: "2.5% 0 5% 0",
    padding: "1%",
    alignItems: "center",
    "&:hover": {
      background: "lightgrey",
      borderRadius: "5px",
    },
  },
  icons: {
    fontSize: "2.75rem",
    color: "grey",
    cursor: "pointer",
    marginRight: "10%",
  },
  button2: {
    fontSize: "1.5rem",
    color: "grey",
    cursor: "pointer",
    border: "none",
    backgroundColor: "white",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "-webkit-xxx-large",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginTop: "3%",
  },
  chatroom: {
    margin: "2% 0",
  },
  box: {
    position: "absolute",
    bottom: "0",
    margin: "1% 1% 1% -1%",
    width: "17.5%",
  },
  searchBox: {
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  chatRoomDiv: {
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
    overflow: "auto",
  },
}));

function InfoBar({ user, setAlertOpen, setNewRoom }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncementOpen] = useState(false);
  const [searchRecipient, setSearchRecipient] = useState("");
  const [results, setResults] = useState([]);

  // Chatroom/Chat messages Subscription
  const { error: roomError, loading: roomsLoading, data: chatRoomSub } = useSubscription(CHAT_ROOM_SUBSCRIPTION)
  const { error: chatError, loading: chatLoading, data: chatsData } = useSubscription(CHAT_SUBSCRIPTION)
  const { error, loading, data: chatRoomData, refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user?.email } })

  // Notification Subscription
  const { error: notificationError, loading: notificationLoading, data: notsub } = useSubscription(NOTIFICATION_SUBSCRIPTION)
  const { data: notifications, refetch: refetchNotifications } = useQuery(GET_NOTIFICATIONS, { variables: { email: user?.email } })

  // Search for a chat room
  const participants = chatRoomData && chatRoomData?.profile.chatRooms.map(item => item.participants).concat().flat();

  const searchRooms = e => {
    e.preventDefault();
    let filter =
      chatRoomData &&
      chatRoomData?.profile.chatRooms.map(room => {
        let users = room.participants.map(user => {
          if (
            user.firstName !== null &&
            user.lastName !== null &&
            user.firstName !== "" &&
            user.lastName !== ""
          ) {
            return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
          }
        });
        return users.filter(user => {
          if (user.includes(searchRecipient.toLowerCase())) {
            results.push(room);
            return results;
          } else if (searchRecipient === "all" || searchRecipient === "All") {
            return participants;
          }
        });
      });
    setSearchRecipient("");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setResults([]);
    setSearchRecipient(e.target.value);
  };

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error || roomError || chatError) return `Error! ${error.message}` || `Error! ${roomError.message}` || `Error! ${chatError.message}` || `Error! ${notificationError.message}`;

  !roomsLoading && refetch();
  !chatLoading && refetch();
  !notificationLoading && refetchNotifications();

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Messages</h1>
      <div className={classes.messageIcons}>
        <CreateIcon className={classes.icons} onClick={handleOpen} />
        <button
          className={classes.button2}
          onClick={handleOpen}
          aria-label="New Message Button"
        > New Message
        </button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <RecipientModal
          user={user}
          setOpen={setOpen}
          setNewRoom={setNewRoom}
          allChatrooms={chatRoomData}
        />
      </Modal>
      <div className={classes.chatRoomDiv}>
        {results.length > 0
          ? results.map((chatRoom, id) => (
            <div className={classes.chatroom} key={chatRoom.id}>
              <ChatRoom
                key={chatRoom.id}
                chatRoom={chatRoom}
                chats={chatsData}
                chatRoomSub={chatRoomSub}
                user={user}
                notifications={notifications?.profile?.notifications}
                results={results}
                setResults={setResults}
              />
            </div>
          ))
          : chatRoomData?.profile?.chatRooms === undefined
            ? null
            : chatRoomData &&
            chatRoomData?.profile.chatRooms?.map((chatRoom) => (
              <div className={classes.chatroom} key={chatRoom.id}>
                <ChatRoom
                  key={chatRoom.id}
                  chatRoom={chatRoom}
                  chats={chatsData}
                  chatRoomSub={chatRoomSub}
                  user={user}
                  notifications={notifications?.profile?.notifications}
                  results={results}
                  setResults={setResults}
                />
              </div>
            ))}
      </div>
      <Tooltip title="Type 'all' or 'All' to clear search results">
        <Box component="div" className={classes.box}>
          <TextField
            className={classes.searchBox}
            variant="outlined"
            type="text"
            name="message"
            placeholder="Search Messages..."
            aria-label="Search Chatrooms"
            value={searchRecipient}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={searchRooms}
                    aria-label="Search Chatrooms"
                  >
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Tooltip>
    </div>
  );
}

export default InfoBar;
