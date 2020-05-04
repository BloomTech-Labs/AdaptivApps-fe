// React imports
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

//Styling Imports
import {
    makeStyles,
    Box,
    TextField,
    Button
  } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    sendButton: {
        width: "10%",
        height: "7.5vh"
    },
    inputField: {
        width: "85%"
    },
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
        </div>
    )
}

export default Input;