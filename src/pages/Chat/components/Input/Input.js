// React imports
import React, { useState } from "react";

// Speech Recognition Import
import { useSpeechRecognition } from "react-speech-kit";

// Query / Mutation Imports
import { SEND_CHAT, SHOW_CHATROOM_All } from "../../queries/Chats";
import { ADD_CHAT_ROOM_PARTICIPANTS } from "../../queries/ChatRooms";
import { CREATE_CHAT_NOTIFICATION } from "../../queries/Notifications";
import { useMutation } from "react-apollo";

//Emoji Picker Import
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

//Styling Imports
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import MicNoneIcon from "@material-ui/icons/MicNone";
import HearingIcon from "@material-ui/icons/Hearing";
import Modal from "@material-ui/core/Modal";
import { makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  inputDiv: {
    width: "75%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  iconDiv: {
    width: "15%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  messageBox: {
    width: "80%",
  },
  icons: {
    color: "#808080",
    fontSize: "3.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  speechIcon: {
    color: "#808080",
    fontSize: "3.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  micOnIcon: {
    color: "green",
    fontSize: "3.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  sendMessageIcon: {
    color: "#2962FF",
    fontSize: "3rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "-webkit-xxx-large",
  },
  btn: {
    backgroundColor: "none",
    background: "none",
    border: "none",
  },
  micOnText: {
    fontSize: "1rem",
    color: "green",
  },
  micOffText: {
    fontSize: "1rem",
  },
}));

const Input = ({ chatRoom, user, messages }) => {
  const classes = useStyles();
  const [toggleEmoji, setToggleEmoji] = useState(false);

  const [sendChat] = useMutation(SEND_CHAT);
  const [showChatroomAll] = useMutation(SHOW_CHATROOM_All);
  const [updateChatRoom] = useMutation(ADD_CHAT_ROOM_PARTICIPANTS);
  const [createChatRoomNotification] = useMutation(CREATE_CHAT_NOTIFICATION);
  const [message, setMessage] = useState("");

  const emojiClick = e => {
    setMessage(message ? message + e.native : e.native);
  };

  // Speech to text logic
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setMessage(message ? message + result : result);
    },
    onEnd: () => console.log("Listening has finished"),
  });

  const toggleListen = listening ? stop : () => listen();

  // Remove current user from participants array
  const recipient = chatRoom?.participants?.filter(participant => {
    return participant.email !== user.email;
  });

  const senderEmail = messages?.filter(
    message => message.sender !== user.email && message.sender
  );
  // Create message via text or speech message
  const newMessage = async () => {
    recipient.length > 0
      ? (await sendChat({
          variables: {
            id: chatRoom.id,
            email: user.email,
            message: message,
          },
        })) &&
        (await createChatRoomNotification({
          variables: {
            id: chatRoom.id,
            email: recipient[0].email,
          },
        })) &&
        (await showChatroomAll({
          variables: {
            id: chatRoom.id,
          },
        })) &&
        setMessage("")
      : (await updateChatRoom({
          variables: {
            id: chatRoom.id,
            email: senderEmail[0].sender,
          },
        })) &&
        (await createChatRoomNotification({
          variables: {
            id: chatRoom.id,
            email: senderEmail[0].sender,
          },
        })) &&
        setMessage("");
  };

  const handleEmojiPicker = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("openEmojiSelection");
      button.click();
    }
  };

  return (
    <div>
      <div className={classes.inputDiv}>
        <div className={classes.iconDiv} onClick={toggleListen}>
          {listening ? (
            <Tooltip title="Stop Recording Message">
              <button
                aria-label="stop recording speech-to-text message"
                className={classes.btn}
              >
                <Typography className={classes.micOnText}>
                  Click to End Listening
                </Typography>
                <HearingIcon className={classes.micOnIcon} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Start Recording Message">
              <button
                aria-label="begin recording speech-to-text message"
                className={classes.btn}
              >
                <Typography className={classes.micOffText}>
                  Click to Begin Listening
                </Typography>
                <MicNoneIcon className={classes.speechIcon} />
              </button>
            </Tooltip>
          )}
        </div>
        <TextField
          className={classes.messageBox}
          rowsMax="4"
          value={message}
          variant="outlined"
          type="text"
          name="newChat"
          placeholder="Type a message..."
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e =>
            e.key === "Enter" && message !== ""
              ? newMessage() && setMessage("")
              : null
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Send Message">
                  <SendIcon
                    tabIndex="0"
                    className={classes.sendMessageIcon}
                    onClick={message !== "" && newMessage}
                    aria-label="send message"
                  />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.iconDiv}>
          <Tooltip title="Add an emoji!">
            <button
              className={classes.btn}
              aria-label="add an emoji to your message"
              onClick={() => setToggleEmoji(true)}
            >
              <MoodIcon
                className={classes.icons}
                aria-label="open emoji picker"
                onKeyDown={e => handleEmojiPicker(e)}
                id="openEmojiSelection"
              />
            </button>
          </Tooltip>
          <Modal
            className={classes.modal}
            open={toggleEmoji}
            onClose={() => setToggleEmoji(false)}
          >
            {toggleEmoji ? (
              <Picker
                onClick={emojiClick}
                title="Pick an Emoji!"
                emoji="woman_in_manual_wheelchair"
              />
            ) : null}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Input;
