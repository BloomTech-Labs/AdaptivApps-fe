// React imports
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { SEND_CHAT } from '../../queries/Chats'

//Emoji Picker Import
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

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
    TextField
  } from "@material-ui/core";

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
    textFieldDiv: {
        width: "100%"
    },
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

const Input = ({ chatRoom, user, refetch }) => {
    const [toggleEmoji, setToggleEmoji] = useState(false) 
    const [sendChat] = useMutation(SEND_CHAT);
    const [message, setMessage] = useState('');
    const classes = useStyles();

    const handleOpen = () => {
        setToggleEmoji(true)
    };

    const handleClose = () => {
        setToggleEmoji(false)
    };
   
    const newMessage = async () => {
        await sendChat({
            variables: {
              id: chatRoom.id,
              email: user.email,
              message: message.message 
            }
        })
        setMessage({ message: ''})
        // alert('Successfully sent message!');
        refetch();
    };   

   const handleChange = e => {
        setMessage({
            message: e.target.value
        })
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
                    <AttachFileIcon className={classes.icons} />
                    <MicNoneIcon className={classes.icons} />
                    <RoomIcon className={classes.icons} />
                </div>
                <TextField
                    className={classes.messageBox}
                    multiline={true}
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
                        onClose={handleClose}>
                        {toggleEmoji ? <Picker onClick={onEmojiClick}/> : null}
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Input;