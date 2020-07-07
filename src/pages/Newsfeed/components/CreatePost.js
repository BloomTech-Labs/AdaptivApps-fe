import React, { useState } from "react";
import config from "../../../config/auth_config";
import { useMutation } from "react-apollo";
// Component Imports
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";
import { CREATE_NEWSFEED_POST } from "../queries/FeedPost";
//s3 bucket imports
import S3FileUpload from "react-s3";
// Styling Imports
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  InputLabel,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles(theme => ({
  root: {
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    margin: "4rem auto",
    display: "flex-column",
    borderRadius: "5px",
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
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
  flexPinnedPost: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "2.75rem",
    marginRight: "1rem",
  },
  photoIcon: {
    fontSize: "2rem",
    marginRight: "1rem",
  },
  inputUpload: {
    display: "none",
  },
  inputLabel: {
    marginBottom: "7px",
    marginLeft: "5px",
    "& .MuiInputLabel-asterisk": {
      fontSize: "1.75rem",
      color: "red",
      fontWeight: "bolder",
    },
  },
  inputField: {
    marginBottom: "10px",
  },
  removalBtn: {
    border: "none",
    backgroundColor: "none",
    background: "none",
  },
  img: {
    width: "200px",
    padding: "0",
    height: "14rem",
    objectFit: "contain",
    borderRadius: "5px",
  },
  createPostIcon: {
    color: "#2962FF",
    fontSize: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function CreatePost({ user, profile }) {
  const classes = useStyles();
  const [postInput, setPostInput] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [pinnedPost, setPinnedPost] = useState(false);

  const [createFeedPost] = useMutation(CREATE_NEWSFEED_POST);

  const handlePinnedPost = e => {
    setPinnedPost(e.target.checked);
  };

  const createPost = async () => {
    await createFeedPost({
      variables: {
        body: postInput,
        imgUrl: postImage,
        postedBy: profile.email,
      },
    });
    setPostInput("");
    setPostImage(null);
  };

  //config options for uploading an event image
  const postImageConfig = {
    bucketName: process.env.REACT_APP_AWS_IMAGE_BUCKET_NAME,
    dirName: `posts/${profile?.email}/post_images`,
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  const uploadPostImage = async e => {
    if (e.target.files[0]) {
      await S3FileUpload.uploadFile(e.target.files[0], postImageConfig)
        .then(async data => {
          if (data && data?.location) {
            await setPostImage(data?.location);
          } else {
            console.log("loading");
          }
        })
        .catch(async err => console.log(err));
    } else {
      console.log("Select an image to upload!");
    }
  };

  const handlePictureEnter = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("uploadPostPicture");
      button.click();
    }
  };

  const props = {
    inputProps: {
      "aria-label":
        "Type a message here that will be posted to the community newsfeed. Then hit enter to send.",
    },
  };

  return (
    <div className={classes.root}>
      <div className={classes.cta}>
        {!postImage ? (
          <div>
            <label className={classes.photoButton} htmlFor="uploadPostPicture">
              <IconButton
                size="medium"
                aria-label="Upload picture for post"
                component="span"
                onKeyDown={e => handlePictureEnter(e)}
              >
                <CropOriginalIcon
                  color="primary"
                  className={classes.photoIcon}
                />
                <Typography>Choose an image to upload!</Typography>
              </IconButton>
            </label>
            <input
              className={classes.inputUpload}
              accept="image/*"
              type="file"
              onChange={uploadPostImage}
              id="uploadPostPicture"
            />
          </div>
        ) : (
            <div className={classes.inputField}>
              <InputLabel required className={classes.inputLabel} htmlFor="image">
                Post Image
            </InputLabel>
              <img
                src={postImage}
                alt="image for this post"
                className={classes.img}
              />
              <Tooltip title="Remove Image">
                <button
                  aria-label="remove uploaded image"
                  className={classes.removalBtn}
                >
                  <CloseIcon
                    onClick={() => setPostImage(null)}
                    aria-label="Remove Image"
                    fontSize="large"
                  />
                </button>
              </Tooltip>
            </div>
          )}
        {/* {user && user[config.roleUrl].includes("Admin") ? (
          <div className={classes.flexPinnedPost}>
            <Checkbox
              check={pinnedPost}
              onChange={handlePinnedPost}
              inputProps={{
                "aria-label": "Click to make this your pinned post",
              }}
              color="default"
              size="large"
            />
            <Typography className={classes.text}>Pin this post?</Typography>
          </div>
        ) : null} */}
      </div>
      <div className={classes.postInput}>
        {profile?.profilePicture ? (
          <CustomMessageIcon
            pictureIcon={profile?.profilePicture}
            myProfileUsername={profile?.userName}
          />
        ) : (
            <AccountCircleIcon className={classes.icon} />
          )}
        <TextField
          {...props}
          size="small"
          type="text"
          variant="outlined"
          multiline
          onKeyPress={e =>
            e.key === "Enter" && postInput !== "" ? createPost() : null
          }
          onChange={e => setPostInput(e.target.value)}
          className={classes.input}
          value={postInput}
          placeholder="Type here to share a post with the community..."
          InputProps={{
            endAdornment: (
              <Button
                position="end"
                aria-label="create post"
                onClick={postInput !== "" && createPost}
              >
                <Tooltip title="Create Post">
                  <SendIcon className={classes.createPostIcon} />
                </Tooltip>
              </Button>
            ),
          }}
        />
      </div>
    </div>
  );
}
