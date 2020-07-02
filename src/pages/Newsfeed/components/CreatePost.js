import React, { useState } from "react";
import { useMutation } from "react-apollo";
// Component Imports
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";
import { CREATE_NEWSFEED_POST_NO_IMAGE } from '../queries/FeedPost'
// Styling Imports
import { makeStyles, TextField, Checkbox, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";

const useStyles = makeStyles(theme => ({
  root: {
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    margin: "4rem auto",
    display: "flex-column",
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
  },
  postInput: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.6rem",
  },
  input: {
    width: "90%",

    "& .MuiInputBase-input": {
      fontSize: "1.4rem",
    },
  },
  cta: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  flexPhoto: {
    display: "flex",
  },
  flexPinnedPost: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    fontSize: "1.8rem",
    color: "#2962FF",
    marginRight: ".9rem",
  },
  text: {
    color: "#808080",
    fontSize: "1.4rem",
  },
  icon: {
    fontSize: '2.75rem',
    marginRight: '1rem'
  }
}));

export default function CreatePost({ user }) {
  const classes = useStyles();
  const [postInput, setPostInput] = useState('')
  const [pinnedPost, setPinnedPost] = useState(false);

  const [createPostNoImage] = useMutation(CREATE_NEWSFEED_POST_NO_IMAGE)

  const handlePinnedPost = e => {
    setPinnedPost(e.target.checked);
  };
  
  const createPost = async () => {
    await createPostNoImage({
      variables: {
        body: postInput,
        postedBy: user.email
      }
    })
    setPostInput('')
  }

  return (
    <div className={classes.root}>
      <div className={classes.postInput}>
        {user?.profilePicture ? (
          <CustomMessageIcon pictureIcon={user?.profilePicture} />
        ) : (
          <AccountCircleIcon className={classes.icon}/>
        )}
        <TextField
          size="small"
          type='text'
          variant="outlined"
          //multiline
          onKeyPress={e =>
            e.key === "Enter" && postInput !== ""
              ? createPost()
              : null
          }
          onChange={e => setPostInput(e.target.value)}
          className={classes.input}
          value={postInput}
          placeholder="What's on your mind?"
        />
      </div>
      <div className={classes.cta}>
        <div className={classes.flexPhoto}>
          <CropOriginalIcon className={classes.image} />
          <Typography className={classes.text}>Add a photo</Typography>
        </div>
        <div className={classes.flexPinnedPost}>
          <Checkbox
            check={pinnedPost}
            onChange={handlePinnedPost}
            inputProps={{ "aria-label": "Click to make this your pinned post" }}
            color="default"
            size="large"
          />
          <Typography className={classes.text}>Pin this post?</Typography>
        </div>
      </div>
    </div>
  );
}
