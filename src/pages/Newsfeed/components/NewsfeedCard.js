import React from 'react';

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
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      margin: '3% auto',
      border: '1px solid black'
    },
    postBody: {
      display: 'flex',
      height: '50%',
      overflow: 'hidden',
      padding: '3%',
      justifyContent: 'center'
    },
    img: {
      maxWidth: '40%',
    },
    post: {
      width: '45%',
      fontSize: '2rem',
    },
    soloPost: {
      width: '90%',
      fontSize: '2.25rem',
      margin: 'auto'
    },
    postHeader: {
      margin: '5% 0 0 5%',
      fontSize: '1rem',
    },
    icon: {
      marginRight: '5%'
    },
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    comment: {
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3% auto',
    },
    input: {
      width: '85%',
      color: 'red',
      marginBottom: '3%',
      backgroundColor: 'rgba(211, 211, 211, 0.296)',
      borderRadius: '5px',
      fontSize: '.25rem',
      '& MuiInputBase-input': {
        fontSize: '.5rem'
      }
    },
    button: {
      fontSize: '1rem'
    }
}))

export default function NewsfeedCard(post) {
  console.log(post)
  const classes = useStyles();
    //const { user } = useAuth0();

  return ( 
    <Card className={classes.root}>
    {post.post.postImg ? (
      <>
      <CardActionArea className={classes.postHeader}>
        <Typography gutterBottom >
        <AccountCircleIcon fontSize={'large'} />
        {post.post.postedBy}
        </Typography>
      </CardActionArea>
      <CardActionArea className={classes.postBody}>
        <CardMedia
          component='img'
          className={classes.img}
          alt='description of post image'
          image={'https://picsum.photos/100'} />
          <CardContent className={classes.post}>
            <p>{post.post.postBody}</p>
          </CardContent>
      </CardActionArea>
      </>
      ) : (
        <>
      <CardActionArea className={classes.postHeader}>
        <Typography gutterBottom >
        <AccountCircleIcon fontSize={'large'} />
        {post.post.postedBy}
        </Typography>
      </CardActionArea>
          <CardContent className={classes.soloPost}>
            <p>{post.post.postBody}</p>
          </CardContent>
      </>
      )}

      <Divider variant='middle'/>
        <CardActions className={classes.cardActions}>
          <Button color="primary" className={classes.button}>
            <ThumbUpAltIcon fontSize={'large'} className={classes.icon} />
            Like
          </Button>
          <Button color="primary" className={classes.button}>
            <ModeCommentIcon fontSize={'large'} className={classes.icon} />
            Comment
          </Button>
        </CardActions>
        <Divider variant='middle'/>
        <CardActionArea className={classes.comment}>
          <AccountCircleIcon fontSize={'large'} className={classes.icon} />
          <TextField
            size='small'
            variant="outlined"
            className={classes.input}
            placeholder='Write a comment...' />
          </CardActionArea>
    </Card>
    )
}