import React, { useState } from 'react';
// Import graphql
// Style Imports
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {
  makeStyles,
  TextField,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: '3% auto',
    border: '1px solid black'
  },
  postBody: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '50%',
    padding: '3%',
    justifyContent: 'center',
  },
  img: {
    maxWidth: '40%',
  },
  post: {
    width: '45%',
    fontSize: '2.15rem',
  },
  soloPost: {
    width: '90%',
    fontSize: '2.25rem',
    margin: 'auto'
  },
  postHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginLeft: '5%',
    fontSize: '1rem',
  },
  icon: {
    margin: '4% 2% 0 0',
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  comment: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
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
    fontSize: '1rem',
  }
}))

export default function NewsfeedCard(props) {
  const classes = useStyles();
  const { post } = props;
  const comments = post.comments;
  const [commenting, setCommenting] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const toggleComment = () => {
    setCommenting(!commenting);
  }

  const showComments = () => {
    setDisplayComments(!displayComments);
  }

  return (
    <Card className={classes.root}>
      {post.imgUrl
        ?
        (<div>
          <CardActionArea className={classes.postHeader}>
            <AccountCircleIcon fontSize={'large'} className={classes.icon} />
            <Typography gutterBottom >
              {post.postedBy.firstName}{" "}{post.postedBy.lastName}
            </Typography>
          </CardActionArea>
          <CardActionArea className={classes.postBody}>
            <CardMedia
              component='img'
              className={classes.img}
              alt='description of post image'
              image={post.imgUrl} />
            <CardContent className={classes.post}>
              <p>{post.body}</p>
            </CardContent>
          </CardActionArea>
        </div>)
        :
        (<div>
          <CardActionArea className={classes.postHeader}>
            <AccountCircleIcon fontSize={'large'} className={classes.icon} />
            <Typography gutterBottom >
              {post.postedBy.firstName}{" "}{post.postedBy.lastName}
            </Typography>
          </CardActionArea>
          <CardContent className={classes.soloPost}>
            <p>{post.body}</p>
          </CardContent>
        </div>
        )
      }

      <Divider variant='middle' />

      <CardActions className={classes.cardActions}>
        <Button color="primary" className={classes.button}>
          <ThumbUpAltIcon fontSize={'large'} className={classes.icon} />
            Like
        </Button>
        <Button color="primary" className={classes.button} onClick={toggleComment}>
          <ModeCommentIcon fontSize={'large'} className={classes.icon} />
            Comment
        </Button>
      </CardActions>

      <Divider variant='middle' />

      <CardActionArea className={classes.postHeader}>
        <button onClick={showComments}><p>{comments.length === 0 ? `No` : `${comments.length}`} comments</p></button>
      </CardActionArea>

      <Divider variant='middle' />

      {commenting ?
        <div className={classes.comment}>
          <AccountCircleIcon fontSize={'large'} className={classes.icon} />
          <TextField
            size='small'
            variant="outlined"
            multiline
            className={classes.input}
            placeholder='Write a comment...' />
          <Button color="primary" className={classes.button}>
            <KeyboardReturnIcon fontSize={'large'} className={classes.icon} />
            Submit
          </Button>
        </div> : null}

      <Divider variant='middle' />

      {displayComments ?
        comments.map(comment => (
          <div key={comment.id}>
            <p>{`${comment.postedBy.firstName} says: ${comment.body}`}</p>
          </div>
        ))
        : null}

    </Card>
  )
}