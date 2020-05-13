// React imports
import React, { useState } from "react";

// Mutation Imports
import { useMutation } from 'react-apollo';
import { UPDATE_CHAT } from '../../queries/Chats';

// Speech Recognition Import
import { useSpeechRecognition } from "react-speech-kit";

//Emoji Picker Import
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

//Styling Imports
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import Modal from '@material-ui/core/Modal';
import {
    makeStyles,
    TextField
  } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  inputDiv: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  iconDiv: {
    width: '15%',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  messageBox: {
    width: "80%",
    marginLeft: '3%'
  },
  icons: {
    color: '#808080',
    fontSize: '3.5rem',
    '&:hover': {
        cursor: "pointer",
      }, 
  },
  speechIcon: {
    color: '#808080',
    fontSize: '3.5rem',
    '&:hover': {
        cursor: "pointer",
      }, 
      marginLeft: '45px',
  },
  sendMessageIcon: {
    color: '#2962FF',
    fontSize: '3rem',
    '&:hover': {
        cursor: "pointer",
      }, 
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: "-webkit-xxx-large",
  }
}));

const EditInput = ({ messageToEdit, setUpdateChat, setEditInput }) => {
  const classes = useStyles();
  const [toggleEmoji, setToggleEmoji] = useState(false);

  //Setting state for speech recognition
  const [textValue, setTextValue] = useState("");
  
  const [updateChat] = useMutation(UPDATE_CHAT);
  const [message, setMessage] = useState(messageToEdit.message);
  
  const emojiOpen = () => {
      setToggleEmoji(true)
  };

  const emojiClose = () => {
      setToggleEmoji(false)
  };

  const onResult = result => {
    setTextValue(result);
  };

  const onEnd =  () => {
    console.log("Listening has finished")
  };

  const { listen, listening, stop } = useSpeechRecognition({onResult, onEnd});
  
  const updateMessage = async () => {
    await updateChat({
      variables: {
        id: messageToEdit.id,
        message: message 
      }
    })
    setEditInput(false);
    setUpdateChat(true);
  };

  const updateSpeechMessage = async () => {
    await updateChat({
        variables: {
          id: messageToEdit.id,
          message: message || textValue
        }
    })
    setTextValue('');
  };

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const onEmojiClick = (e) => {
    setMessage({
      message: message.message ? message.message + e.native : e.native
    });
  };

  return(
    <div>
      <div className={classes.inputDiv}>
        <div className={classes.iconDiv}>
          <MicNoneIcon className={classes.speechIcon} onMouseDown={listen} onMouseUp={stop}/>
          {listening && <div>Go ahead I'm listening</div>}
        </div>            
        <TextField
          className={classes.messageBox}
          multiline={true}
          rowsMax='4'
          value={message || textValue}
          variant="outlined"
          type="text"
          name="updateChat"
          onChange={textValue ? onResult : handleChange}
          InputProps={{
              endAdornment: <InputAdornment position="end">
              <SendIcon
              className={classes.sendMessageIcon} 
              onClick={textValue ? updateSpeechMessage : updateMessage} />
          </InputAdornment>
          }} />
        <div className={classes.iconDiv}>
          <MoodIcon className={classes.icons} onClick={emojiOpen}/>
          <Modal
            className={classes.modal}
            open={toggleEmoji}
            onClose={emojiClose}>
            {toggleEmoji ? <Picker onClick={onEmojiClick}/> : null}
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default EditInput;