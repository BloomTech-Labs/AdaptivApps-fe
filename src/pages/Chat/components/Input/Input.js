// React imports
import React, {useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";

//Styling Imports
import {
    makeStyles,
    Container,
    Typography,
    Box,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Button,
  } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';


//   const useStyles = makeStyles(theme => ({
//     root: {
//       maxwidth: "100%",
//       width: "90%",
//       // fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
//     },
// }));


const Input = ({ loading, chats, updateChats }) => {
    const [updated, setUpdated] = useState(false);
    // const classes = useStyles();

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
        //backend update

        //frontend update

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
              />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setUpdated(true);
                          }}
                        endIcon={<Icon>send</Icon>}
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