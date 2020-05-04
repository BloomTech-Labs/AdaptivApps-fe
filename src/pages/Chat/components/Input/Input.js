// React imports
import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { SEND_CHAT } from '../../queries/Chats'

//Auth0 Imports
import { Auth0Context } from "../../../../config/react-auth0-spa";

//Styling Imports
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicNoneIcon from '@material-ui/icons/MicNone';
import RoomIcon from '@material-ui/icons/Room';
import MoodIcon from '@material-ui/icons/Mood';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
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
    }
}));

const Input = ({ loading, chatRoom, user, messages }) => {

    console.log('input.js', chatRoom, user)

    const [sendChat] = useMutation(SEND_CHAT);
    const [message, setMessage] = useState('');
    const classes = useStyles();
   
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

    return(
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
            <MoodIcon className={classes.icons}/>
            <FiberManualRecordIcon className={classes.icons}/>
            <AssignmentTurnedInIcon className={classes.icons}/>
                </div>
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