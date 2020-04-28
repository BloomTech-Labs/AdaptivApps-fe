// React imports
import React from "react";

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


function Input() {

    //useForm hook to update state

    //need an onSubmit to update the chat messages in the backend and frontend
    const onSubmit = (values, e) => {
        e.preventDefault();
        //backend update

        //frontend update

    }

    //Update message area with new chats - useEffect()
   
    return(
        <div>
            <form>
                <Box component="div">
                    <InputLabel htmlFor="newMessage">
                        Type a message...  
                    </InputLabel>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                    >
                    Send
                </Button>
                </Box>
            </form>
        </div>
    )
}

export default Input;