// React imports
feature/handle_null_wrap_input
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { SEND_CHAT } from '../../queries/Chats'

//Auth0 Imports
import { Auth0Context } from "../../../../config/react-auth0-spa";

//Emoji Picker Import
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
 master

//Styling Imports
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicNoneIcon from '@material-ui/icons/MicNone';
import RoomIcon from '@material-ui/icons/Room';
import MoodIcon from '@material-ui/icons/Mood';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Modal from '@material-ui/core/Modal';
import {
    makeStyles,
    Box,
    TextField,
    Button
  } from "@material-ui/core";
import { send } from "react-ga";



const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "7.5vh"
    },
    inputDiv: {
        position: 'absolute',
        bottom: '3%',
        width: '95%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
 feature/handle_null_wrap_input
    textFieldDiv: {
        width: "100%"
    }
}));

const Input = () => {
    const [updated, setUpdated] = useState(false);
    const classes = useStyles();

    //useForm hook to update state
    const { handleSubmit, control } = useForm({
        mode: "onSubmit",
        defaultValues: {
            // chat: participant.chats
        },
    });

    //need an onSubmit to update the chat messages in the backend and frontend
    const onSubmit = (values, e) => {
        e.preventDefault();
        console.log('Sent message!')

    iconDiv: {
        width: '25%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    messageBox: {
        width: "50%",
        margin: 'auto',
        
    },
    icons: {
        color: '#808080',
        fontSize: '3.5rem',
        '&:hover': {
            cursor: "pointer",
          }, 
    },
    sendMessageIcon: {
        color: '#2962FF',
        fontSize: '3rem',
        border: '2px solid #2962FF',
        borderRadius: '50px',
        '&:hover': {
            cursor: "pointer",
          }, 
    },
    emojiPicker: {
        width: '100px',
        position: 'absolute',
        bottom: '5%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: "-webkit-xxx-large",
      },
      
}));

const Input = ({ loading, chatRoom, user, messages }) => {
    const [toggleEmoji, setToggleEmoji] = useState(false) 
    const [sendChat] = useMutation(SEND_CHAT);
    const [message, setMessage] = useState('');
    const classes = useStyles();

    const handleOpen = () => {
        setToggleEmoji(true)
 master
    }

    const handleClose = () => {
        setToggleEmoji(false)
    }
   
    const newMessage = async () => {
        await sendChat({
            variables: {
              id: chatRoom.id,
              email: user.email,
              message: message.message 
            }
        })
        setMessage({ message: ''})
    }    

   const handleChange = e => {
        setMessage({
            message: e.target.value
        })
    };

    const onEmojiClick = (event, emojiObject) => {
        setMessage({
            message: message + emojiObject.native
        });
    }

    return(
 feature/handle_null_wrap_input
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box component="div" className={classes.textFieldDiv}>
                    <Controller
                        as={<TextField multiline={true} rowsMax='4' />}
                        id="message"
                        variant="outlined"
                        type="text"
                        placeholder="Type a message..."
                        name="message"
                        control={control}
                        className={classes.inputField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {setUpdated(true)}}
                        className={classes.sendButton}>
                        Send
                    </Button>
                    {updated === true ? handleUpdated() : null}
                </Box>
            </form>

        
        <div className={classes.inputDiv}>            
            <div className={classes.iconDiv}>
            <AttachFileIcon className={classes.icons} />
            <MicNoneIcon className={classes.icons} />
            <RoomIcon className={classes.icons} />
            </div>
            <TextField
                      className={classes.messageBox}
                      multiline='true'
                      rowsMax='4'
                      value={message.message}
                      variant="outlined"
                      type="text"
                      name="newChat"
                      placeholder="Type a message..."
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                        <KeyboardArrowRightIcon
                        className={classes.sendMessageIcon} 
                        onClick={newMessage} />
                      </InputAdornment>
                      }}
                      />
            <div className={classes.iconDiv}>
            <MoodIcon className={classes.icons} onClick={handleOpen}/>
            <FiberManualRecordIcon className={classes.icons}/>
            <AssignmentTurnedInIcon className={classes.icons}/>
            <Modal
            className={classes.modal}
            open={toggleEmoji}
            onClose={handleClose}
            >
            {toggleEmoji ? <Picker onClick={onEmojiClick}/> : null}
            </Modal>
            </div>
 master
        </div>
    )
}

export default Input;

{/* <Box component="div" className={classes.textFieldDiv}>
<TextField
    as={<TextField />}
    id="message"
    variant="outlined"
    type="text"
    placeholder="Type a message..."
    name="message"
    control={control}
    className={classes.inputField}
/>
<Button
    variant="contained"
    color="primary"
    onClick={() => {setUpdated(true)}}
    className={classes.sendButton}>
    Send
</Button>
{updated === true ? handleUpdated() : null}
</Box> */}