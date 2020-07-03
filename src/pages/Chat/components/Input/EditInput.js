// React imports
import React, { useState } from "react";

// Mutation Imports
import { useMutation } from "react-apollo";
import { UPDATE_CHAT } from "../../queries/Chats";

// Speech Recognition Import
import { useSpeechRecognition } from "react-speech-kit";

//Emoji Picker Import
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

//Styling Imports
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import MoodIcon from "@material-ui/icons/Mood";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Modal from "@material-ui/core/Modal";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  inputDiv: {
    width: "75%",
    display: "flex",
    alignItems: "center",
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
}));

const EditInput = ({ messageToEdit, setUpdateChat, setEditInput }) => {
  const classes = useStyles();
  const [toggleEmoji, setToggleEmoji] = useState(false);

  const [updateChat] = useMutation(UPDATE_CHAT);
  const [message, setMessage] = useState(messageToEdit.message);

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

  // Update message via text
  const updateMessage = async () => {
    await updateChat({
      variables: {
        id: messageToEdit.id,
        message: message,
      },
    });
    setEditInput(false);
    setUpdateChat(true);
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
        <div
          className={classes.iconDiv}
          onClick={toggleListen}
        >
          <button className={classes.btn} aria-label="create speech-to-text message">
            <MicNoneIcon className={classes.speechIcon} />
          </button>
          {listening && "Go ahead, I'm listening"}
        </div>
        <TextField
          className={classes.messageBox}
          multiline={true}
          rowsMax="4"
          value={message}
          variant="outlined"
          type="text"
          name="updateChat"
          onKeyPress={e =>
            e.key === "Enter" && message !== "" ? updateMessage() : null
          }
          onChange={e => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Update Message">
                  <button className={classes.btn}>
                    <SendIcon
                      className={classes.sendMessageIcon}
                      onClick={message !== "" && updateMessage}
                      aria-label="update message"
                    />
                  </button>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.iconDiv}>
          <Tooltip title="Add an emoji!">
            <button className={classes.btn} aria-label="add an emoji to your message" onClick={() => setToggleEmoji(true)}>
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

export default EditInput;
