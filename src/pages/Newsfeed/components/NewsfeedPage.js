import React from 'react';
import NewsfeedCard from './NewsfeedCard'
import SpotlightBar from './SpotlightBar'

// Style Imports
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { 
    makeStyles, 
    Box, 
    TextField,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Input,
    Divider,
    Typography
} from "@material-ui/core";

//import { useAuth0 } from "../../config/react-auth0-spa";

const useStyles = makeStyles(theme => ({
    root: {
      width: '80%',
    },
    container: {
      display: 'flex'
    }
  
}))

export default function NewsfeedPage() {
  const classes = useStyles();
    //const { user } = useAuth0();

  return ( 
    <div className={classes.root}>
      <div className={classes.container}>
        <NewsfeedCard />
        <SpotlightBar />
      </div>
    </div>
    )
}