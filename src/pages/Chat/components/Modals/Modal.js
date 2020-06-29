import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_CHAT_ROOM } from "../../queries/ChatRooms";
import { GET_RECIPIENTS, SHOW_CHATROOM_SENDER, SHOW_CHATROOM_RECEIVER } from '../../queries/Chats'

//Style imports
import {
  makeStyles,
  Box,
  TextField,
  ListItem,
  Paper,
  List,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { recip } from "prelude-ls";

const useStyles = makeStyles(theme => ({
  span: {
    fontSize: "2rem",
    color: "#2962FF",
    textAlign: "center",
    fontWeight: "normal",
    marginTop: "0%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "-webkit-xxx-large",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "2% 1%",
    "&:hover": {
      color: "#2962FF",
      cursor: "pointer",
      borderRadius: "5px",
    },
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: "100%",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  search: {
    textAlign: "center",
    fontSize: "2rem",
    lineHeight: "10px",
    fontWeight: "bold",
    color: "#2962FF",
  },
  noSearch: {
    display: "none",
  },
  errorState: {
    display: "block",
    width: "95%",
    fontSize: "2.2rem",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "15px",
    "& p:first-child": {
      color: "red",
      marginTop: "5%",
    },
  },
  errorClose: {
    fontSize: "1.25rem",
    color: "black",
    fontWeight: "bolder",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
  },
  noError: {
    display: "none",
  },
}));

function RecipientModal({
  user,
  setOpen,
  allChatrooms,
  setNewRoom,

}) {
  const classes = useStyles();
  const [searchRecipient, setSearchRecipient] = useState("");
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState(true);
  const [foundInRecipientSearch, setFoundInRecipientSearch] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

  const { data: allUsers } = useQuery(GET_RECIPIENTS);
  const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);
  const [showChatroomSender] = useMutation(SHOW_CHATROOM_SENDER);
  const [showChatroomReceiver] = useMutation(SHOW_CHATROOM_RECEIVER);

  // Return a list of all currently available chatrooms in term of users
  const hiddenChatRooms = [];
  const currentChatRooms = [];
  for (let i = 0; i < allChatrooms?.profile?.chatRooms?.length; i++) {
    console.log('in the loop', allChatrooms.profile.chatRooms[i])
    if (allChatrooms.profile.chatRooms[i].senderEmail === user.email && !allChatrooms.profile.chatRooms[i].displayForSender) {
      hiddenChatRooms.push(allChatrooms.profile.chatRooms[i]);
    }
    else if (allChatrooms.profile.chatRooms[i].senderEmail !== user.email && !allChatrooms.profile.chatRooms[i].displayForReceiver) {
      hiddenChatRooms.push(allChatrooms.profile.chatRooms[i]);
    }
    else {
      const current = allChatrooms.profile.chatRooms[i].participants.filter(participant => participant.email !== user.email)
      currentChatRooms.push(current[0])
    }
  }

  console.log('hidden', hiddenChatRooms);
  console.log('current', currentChatRooms)

  const availableToChat = [];
  allUsers && allUsers.profiles.map(person => {
    console.log('unique', currentChatRooms)
    let unique = currentChatRooms.find(item => item.email === person.email)
    if (unique === undefined && person.email !== user.email && person.firstName !== null && person.lastName !== null) {
      availableToChat.push(person);
    };
  });

  console.log('available', availableToChat)

  const searchAvailableRooms = e => {
    e.preventDefault();
    let filter = availableToChat.map(user => {
      return [`${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`, user];
    });

    filter.filter(user => {
      if (user[0].includes(searchRecipient.toLowerCase())) {
        results.push(user[1]);
      }
      setTimeout(() => {
        if (results[0] == undefined || results.length === 0) {
          setFoundInRecipientSearch(true);
          setSearchText(false);
        }
      }, 500);
    });
    setSearchRecipient("");
  };

  const checkHiddenChats = (hiddenChatRooms, recipient) => {
    for (let i = 0; i < hiddenChatRooms.length; i++) {
      const email1 = hiddenChatRooms[i].participants[0].email;
      const email2 = hiddenChatRooms[i].participants[1].email;
      if (recipient.email === email1 || recipient.email === email2) {
        if (hiddenChatRooms[i].senderEmail === user.email && !hiddenChatRooms[i].displayForSender) {
          return hiddenChatRooms[i].id;
        }
        else if (hiddenChatRooms[i].senderEmail === recipient.email && !hiddenChatRooms[i].displayForReceiver) {
          return hiddenChatRooms[i].id;
        }
      }
    }
    return false;
  }

  const checkAmISender = roomID => {
    for (let i = 0; i < allChatrooms?.profile.chatRooms.length; i++) {
      if (allChatrooms.profile.chatRooms[i].id === roomID) {
        return allChatrooms.profile.chatRooms[i].senderEmail === user.email;
      }
    }
    return false;
  }

  const createNewChatRoom = async recipient => {
    const roomID = checkHiddenChats(hiddenChatRooms, recipient);
    if (!roomID) {
      await createChatRoom({
        variables: {
          useremail: user.email,
          recipientemail: recipient.email,
        },
      });
    } else {
      if (checkAmISender(roomID)) {
        await showChatroomSender({
          variables: {
            id: roomID
          }
        })
      }
      else {
        await showChatroomReceiver({
          variables: {
            id: roomID
          }
        })
      }
    }

    setDisableClick(true);
    setTimeout(() => setDisableClick(false), 5000);
    setOpen(false);
    setNewRoom(true);
  };

  const handleChange = e => {
    setFoundInRecipientSearch(false);
    setResults([]);
    setSearchRecipient(e.target.value);
  };

  const closeModal = e => {
    e.preventDefault();
    setOpen(false);
  };

  // Return search results in list
  const searchResults =
    results.length > 0 &&
    results.map(result => {
      const filtered = availableToChat.filter(available => {
        if (
          available.email === result.email &&
          available.firstName !== "" &&
          available.lastName !== ""
        ) {
          return available;
        }
      });
      if (filtered[0] !== result.email) {
        return (
          <ListItem
            className={classes.listItem}
            value={`${result.firstName} ${result.lastName}`}
            diabled={disableClick}
            onClick={() => createNewChatRoom(result)}
          >
            <ListItemText primary={`${result.firstName} ${result.lastName}`} />
          </ListItem>
        );
      }
    });

  // List of recipients available to chat with
  const chatResults =
    !results.length &&
    availableToChat.map(available => {
      return (
        <ListItem
          className={classes.listItem}
          value={`${available.firstName} ${available.lastName}`}
          onClick={() => createNewChatRoom(available)}
        >
          <ListItemText primary={`${available.firstName} ${available.lastName}`} />
        </ListItem>
      );
    });

  return (
    <div>
      <div className={classes.paper}>
        <CloseIcon className={classes.closeModal} onClick={closeModal} />
        <h2
          id="transition-modal-title"
          className={classes.span}
          aria-label="Select a Chat Recipient"
        >
          Select a Chat Recipient
        </h2>
        <div>
          <Box component="div">
            <TextField
              variant="outlined"
              type="text"
              placeholder="Search for a Recipient"
              name="message"
              value={searchRecipient}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={searchAvailableRooms}
                    >
                      <SearchIcon fontSize="large" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.root}>
              <div>
                <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                  <List>
                    <div
                      className={
                        foundInRecipientSearch ? classes.errorState : classes.noError
                      }
                    >
                      <p>We couldn't find that user</p>
                      <p>Check your current chat rooms</p>
                    </div>
                    {searchResults}
                    {!results.length && (
                      <div
                        className={
                          searchText ? classes.search : classes.noSearch
                        }
                      >
                        <p>Search for a user above or</p>
                        <p>choose from the list below!</p>
                      </div>
                    )}
                    {chatResults}
                  </List>
                </Paper>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default RecipientModal;
