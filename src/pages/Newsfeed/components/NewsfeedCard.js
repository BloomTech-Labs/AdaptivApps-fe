import React from 'react';
// Style Imports
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
    margin: '4% 2% 0 0'
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

export default function NewsfeedCard(props) {
  const classes = useStyles();
  const { post } = props;
  console.log(post)
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
        <Button color="primary" className={classes.button}>
          <ModeCommentIcon fontSize={'large'} className={classes.icon} />
            Comment
          </Button>
      </CardActions>
      <Divider variant='middle' />
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