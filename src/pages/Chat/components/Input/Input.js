// React imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

//Styling Imports
import {
    makeStyles,
    Box,
    TextField,
    Button
  } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(() => ({
    sendButton: {
        width: "10%",
        height: "7.5vh"
    },
    inputField: {
        width: "90%"
    },
}));

const Input = ({ loading, chats, updateChats }) => {
    const [updated, setUpdated] = useState(false);
    const classes = useStyles();

    //useForm hook to update state
    const { handleSubmit, register, setValue, control } = useForm({
        mode: "onSubmit",
        defaultValues: {
            // chat: participant.chats
        },
    });

    //need an onSubmit to update the chat messages in the backend and frontend
    const onSubmit = (values, e) => {
        e.preventDefault();
        console.log('Sent message!')
    }

    //Update message area with new chats - useEffect()
   
    // alerts user to successful update, handy for screen readers
    const handleUpdated = () => {
        alert("Chat sent successfully!");
        setUpdated(false);
    };

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box component="div">
                    <Controller
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
                        onClick={() => {
                            setUpdated(true);
                          }}
                        endIcon={<Icon>send</Icon>}
                        className={classes.sendButton}
                    >
                    Send
                </Button>
                {updated === true ? handleUpdated() : null}
                </Box>
            </form>
        </div>
    )
}

export default Input;