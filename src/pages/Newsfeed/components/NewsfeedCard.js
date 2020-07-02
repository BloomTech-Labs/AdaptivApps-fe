import React, { useState } from "react";
// Import graphql
import { useQuery } from "react-apollo";
import { GET_NEWSFEED_COMMENTS } from "../queries";
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";
// Style Imports
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
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
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "4rem auto 0 auto",
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    paddingBottom: "1.2rem",
    display: 'flex-column',
    '& .MuiCardContent-root': {
      width: '100%',
      padding: '0'
    }
  },
  postBody: {
    display: "flex",
    flexWrap: "wrap",
    height: "50%",
    padding: "3%",
    justifyContent: "center",
  },
  img: {
    maxWidth: "40%",
  },
  post: {
    width: "45%",
    fontSize: "2.5rem",
    fontWeight: 'bold',
    border: '1px solid green',
    
  },
  soloPost: {
    textAlign: 'left',
    fontSize: "3rem",
    fontWeight: 'bold',
    
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "1.6rem",
    fontSize: "1rem",
  },
  icon: {
    margin: "4% 2% 0 0",
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  comment: {
    width: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    margin: "3% auto",
  },
  input: {
    width: "85%",
    color: "red",
    marginBottom: "3%",
    backgroundColor: "rgba(211, 211, 211, 0.296)",
    borderRadius: "5px",
    fontSize: ".25rem",
    "& MuiInputBase-input": {
      fontSize: ".5rem",
    },
  },
  button: {
    fontSize: "1rem",
  },
}));

export default function NewsfeedCard(props) {
  const classes = useStyles();
  const { post, user } = props;
  const { data: comments, loading, error } = useQuery(GET_NEWSFEED_COMMENTS, {
    variables: {
      id: post.id,
    },
  });
  const [commenting, setCommenting] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const toggleComment = () => {
    setCommenting(!commenting);
  };

  const showComments = () => {
    setDisplayComments(!displayComments);
  };

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  console.log(user)
  return (
    
      
        <Card className={classes.root}>
          <CardActions className={classes.postHeader}>
            {user?.picture ? <CustomMessageIcon pictureIcon={user?.picture} /> : <AccountCircleIcon fontSize={"large"} className={classes.icon} />}
            <Typography gutterBottom>
              {post.postedBy.firstName} {post.postedBy.lastName}
            </Typography>
          </CardActions>
          <CardActions className={classes.postBody}>
            {post.imgUrl ? (<CardMedia
              component="img"
              className={classes.img}
              alt="description of post image"
              image={post.imgUrl}
            />) : null}
            <CardContent>
              <p className={post.imgUrl ? classes.post : classes.soloPost}>{post.body}</p>
            </CardContent>
          </CardActions>
      <Divider variant="middle" />

      <CardActions className={classes.cardActions}>
        <Button color="primary" className={classes.button}>
          <ThumbUpAltIcon fontSize={"large"} className={classes.icon} />
          Like
        </Button>
        <Button
          color="primary"
          className={classes.button}
          onClick={toggleComment}
        >
          <ModeCommentIcon fontSize={"large"} className={classes.icon} />
          Comment
        </Button>
      </CardActions>

      <Divider variant="middle" />

      <CardActionArea className={classes.postHeader}>
        <button onClick={showComments}>
          <p>
            {comments && comments.feedComments.length === 0
              ? `No`
              : `${comments.feedComments.length}`}{" "}
            comments
          </p>
        </button>
      </CardActionArea>

      <Divider variant="middle" />

      {commenting ? (
        <div className={classes.comment}>
          <AccountCircleIcon fontSize={"large"} className={classes.icon} />
          <TextField
            size="small"
            variant="outlined"
            multiline
            className={classes.input}
            placeholder="Write a comment..."
          />
          <Button color="primary" className={classes.button}>
            <KeyboardReturnIcon fontSize={"large"} className={classes.icon} />
            Submit
          </Button>
        </div>
      ) : null}

      <Divider variant="middle" />

      {comments && displayComments
        ? comments.feedComments.map(comment => (
            <div key={comment.id}>
              <p>{`${comment.postedBy.firstName} says: ${comment.body}`}</p>
              <Divider variant="middle" />
            </div>
          ))
        : null}


    </Card>
  );
}
