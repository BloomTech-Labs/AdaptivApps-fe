import React, { useState } from "react";
import config from "../../../config/auth_config";
import { useMutation, useQuery, useSubscription } from "react-apollo";
import {
  PIN_NEWSFEED_POST,
  UPDATE_NEWSFEED_POST,
  DELETE_NEWSFEED_POST,
} from "../queries/FeedPost";
import {
  CREATE_NEWSFEED_COMMENT,
  GET_NEWSFEED_COMMENTS,
  NEWSFEED_COMMENT_SUBSCRIPTION,
} from "../queries/FeedComment";
// Component Imports
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";

// Styling Imports
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

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

const ACS_Icon = require("../../../assets/images/ACS_ICON.png");

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    paddingBottom: "1rem",
    "& .MuiCardContent-root": {
      width: "100%",
      padding: "0",
    },
    "& .MuiTextField-root": {
      width: "61.6rem",
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.4rem",
    },
  },
  paper: {
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
  label: {
    backgroundColor: "#2962FF",
    fontWeight: "bold",
    fontSize: "1.6rem",
    padding: ".9rem 1.6rem",
  },
  pinnedBy: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1.6rem",
    alignItems: "center",
  },
  acs: {
    display: "flex",
    fontSize: "2.25rem",
    alignItems: "center",
  },
  postBody: {
    textAlign: "left",
    fontSize: "3rem",
    fontWeight: "bold",
    padding: "0 1.6rem 7rem",
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cta: {
    fontSize: "1.4rem",
    color: "black",
  },
  icon: {
    marginRight: ".7rem",
  },
  comment: {
    width: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    margin: "3% auto",
  },
  img: {
    maxWidth: "40%",
    padding: "0 1.6rem",
    borderRadius: "5px",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyItems: "flex-end",
    borderRadius: "3px",
    background: "none",
    lineHeight: "30px",
    width: "100%",
    fontSize: "2.4rem",
    border: "none",
  },
  icons: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  editDeleteBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    padding: "none",
  },
  commentBox: {
    marginLeft: ".8rem",
    lineHeight: ".6rem",
    display: "flex",
    flexDirection: "column",
  },
  flex: {
    margin: "2.4rem 0 0 1.6rem",
    display: "flex",
    alignItems: "stretch",
  },
  showAllComments: {
    margin: "2.4rem 0 0 1.6rem",
    display: "flex",
    alignItems: "stretch",
  },
  commentName: {
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  commentContent: {
    fontSize: "1.4rem",
  },
  commentOverflow: {
    display: "none",
  },
  avatarIcon: {
    fontSize: "2.75rem",
    margin: "0 .8rem 0 1.2rem",
  },
  // editDeleteBtn: {
  //   width: "20%",
  // },
}));

// need card for img uploaded
// img uploader
// editing/deleting capabilities
// pin post
// tooltips/aria labels

export default function PinnedPost({ user, pinnedPost, refetchPosts }) {
  const classes = useStyles();
  const [commenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [toggleCommentOverflow, setToggleCommentOverflow] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [postToEdit, setPostToEdit] = useState(pinnedPost?.body);
  const [editing, setEditing] = useState(false);

  const { data: comments, loading, error, refetch } = useQuery(
    GET_NEWSFEED_COMMENTS,
    {
      variables: {
        id: pinnedPost.id && pinnedPost.id,
      },
      skip: !pinnedPost,
    }
  );

  const {
    data: commentSub,
    loading: commentsLoading,
    error: commentSubError,
  } = useSubscription(NEWSFEED_COMMENT_SUBSCRIPTION);

  const [pinFeedPost] = useMutation(PIN_NEWSFEED_POST);
  const [updatePost] = useMutation(UPDATE_NEWSFEED_POST);
  const [createComment] = useMutation(CREATE_NEWSFEED_COMMENT);
  const [deletePinnedPost] = useMutation(DELETE_NEWSFEED_POST);

  const toggleComment = () => {
    setCommenting(!commenting);
  };

  const pinPost = async () => {
    await pinFeedPost({
      variables: {
        id: pinnedPost.id,
        pinnedPost: false,
      },
    });
    refetchPosts();
  };

  const editPinnedPost = async () => {
    await updatePost({
      variables: {
        id: pinnedPost.id,
        body: postToEdit,
      },
    });
    setEditing(false);
  };

  const deletePost = async () => {
    await deletePinnedPost({
      variables: {
        id: pinnedPost.id,
      },
    });
  };

  const addComment = async () => {
    await createComment({
      variables: {
        body: commentText,
        email: user.email,
        id: pinnedPost.id,
      },
    });
    setCommentText("");
  };

  !commentsLoading && refetch();

  return (
    <>
      {pinnedPost ? (
        <Card className={classes.root}>
          <CardActionArea className={classes.postHeader}>
            <Typography
              variant="h3"
              color="secondary"
              className={classes.label}
            >
              Angel City Sports Pinned Post
            </Typography>
            <div className={classes.pinnedBy}>
              <div className={classes.acs}>
                <CustomMessageIcon pictureIcon={ACS_Icon} />
                <p>Angel City Sports</p>
              </div>
              {user && user[config.roleUrl].includes("Admin") ? (
                <div className={classes.editDeleteBtn}>
                  <Button className={classes.btn} onClick={pinPost}>
                    <FontAwesomeIcon
                      icon={faThumbtack}
                      className={classes.icons}
                    />
                  </Button>
                  <Button
                    className={classes.btn}
                    onClick={() => setEditing(!editing)}
                  >
                    <EditOutlinedIcon color="action" fontSize="large" />
                  </Button>
                  <Button onClick={deletePost} className={classes.btn}>
                    <DeleteOutlineIcon color="action" fontSize="large" />
                  </Button>
                </div>
              ) : null}
            </div>
          </CardActionArea>
          <CardContent
            className={
              pinnedPost.imgUrl ? classes.postImage : classes.postNoImage
            }
          >
            {pinnedPost.imgUrl ? (
              <CardMedia
                component="img"
                className={classes.img}
                alt="description of post image"
                image={pinnedPost.imgUrl}
              />
            ) : null}
            {editing ? (
              <>
                <Typography variant="subtitle">
                  Once you've updated your post, hit Enter to send
                </Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  multiline
                  onKeyPress={e =>
                    e.key === "Enter" && postToEdit !== ""
                      ? editPinnedPost()
                      : null
                  }
                  onChange={e => setPostToEdit(e.target.value)}
                  value={postToEdit}
                  placeholder="Edit your post..."
                  aria-label="Edit your post, then hit enter to send"
                />
              </>
            ) : (
              <Typography className={classes.postBody}>
                {pinnedPost.body}
              </Typography>
            )}
          </CardContent>
          <Divider variant="middle" />

          <CardActions className={classes.cardActions}>
            <Button color="primary" className={classes.button}>
              <ThumbUpAltIcon fontSize={"large"} className={classes.icon} />
              <span className={classes.cta}>Like</span>
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={toggleComment}
            >
              <ModeCommentIcon fontSize={"large"} className={classes.icon} />
              <Typography className={classes.cta}>Comment</Typography>
            </Button>
          </CardActions>

          <Divider variant="middle" />

          <div className={classes.comment}>
            <TextField
              size="small"
              type="text"
              variant="outlined"
              //multiline
              onKeyPress={e =>
                e.key === "Enter" && commentText !== "" ? addComment() : null
              }
              onChange={e => setCommentText(e.target.value)}
              value={commentText}
              placeholder="Write a comment..."
            />
          </div>
          {/* ) : null} */}

          {comments?.feedComments.map((comment, i) => (
            <div
              key={comment.id}
              className={
                i < 3 && !toggleCommentOverflow
                  ? classes.flex
                  : toggleCommentOverflow
                  ? classes.showAllComments
                  : classes.commentOverflow
              }
            >
              {comment?.postedBy?.profilePicture ? (
                <CustomMessageIcon
                  pictureIcon={comment?.postedBy?.profilePicture}
                />
              ) : (
                <AccountCircleIcon
                  fontSize={"large"}
                  className={classes.avatarIcon}
                />
              )}

              <div className={classes.commentBox}>
                <Typography className={classes.commentName}>
                  {comment.postedBy.firstName} {comment.postedBy.lastName}
                </Typography>
                <Typography className={classes.commentContent} gutterBottom>
                  {comment.body}
                </Typography>
              </div>
            </div>
          ))}

          {comments?.feedComments?.length > 3 ? (
            <Button
              onClick={() => setToggleCommentOverflow(!toggleCommentOverflow)}
            >
              {toggleCommentOverflow ? "hide comments" : "show more comments"}
            </Button>
          ) : null}
        </Card>
      ) : null}
    </>
  );
}
// {commenting ? (
//   <div className={classes.comment}>
//     <AccountCircleIcon fontSize={"large"} className={classes.icon} />
//     <TextField
//       size="small"
//       variant="outlined"
//       multiline
//       className={classes.input}
//       placeholder="Write a comment..."
//     />
//     <Button color="primary" className={classes.button}>
//       <KeyboardReturnIcon
//         fontSize={"large"}
//         className={classes.icon}
//       />
//       Submit
//     </Button>
//   </div>
// ) : null}
