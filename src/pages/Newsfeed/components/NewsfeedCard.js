import React, { useState } from "react";
// Moment import
import moment from "moment";
import config from "../../../config/auth_config";
import { useNavigate } from "@reach/router";
// Import graphql
import { useQuery, useMutation, useSubscription } from "react-apollo";
import {
  CREATE_NEWSFEED_COMMENT,
  GET_NEWSFEED_COMMENTS,
  NEWSFEED_COMMENT_SUBSCRIPTION,
  DELETE_COMMENT,
} from "../queries/FeedComment";
import {
  DELETE_NEWSFEED_POST,
  PIN_NEWSFEED_POST,
  UPDATE_NEWSFEED_POST,
} from "../queries/FeedPost";
import {
  CREATE_NEWSFEED_LIKE,
  DELETE_NEWSFEED_LIKE,
} from "../queries/FeedLikes";
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";
// Style Imports
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import CircleIcon from "@material-ui/icons/FiberManualRecord";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import SendIcon from "@material-ui/icons/Send";
import {
  makeStyles,
  TextField,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Typography,
  Tooltip,
  Icon,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faThumbsUp,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "4rem auto 0 auto",
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    paddingBottom: "1.2rem",
    display: "flex-column",
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
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
  postBody: {
    display: "flex",
    flexDirection: "column",
    //flexWrap: "wrap",
    height: "50%",
    alignItems: "flex-start",
  },
  img: {
    margin: "auto",
    maxWidth: "80%",
    borderRadius: "5px",
    objectFit: "contain",
  },
  post: {
    fontSize: "2.75rem",
    fontWeight: "bold",
    margin: "3rem 0 0 0",
    paddingRight: "1.6rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  soloPost: {
    textAlign: "left",
    fontSize: "3rem",
    fontWeight: "bold",
    padding: "0 1.6rem 7rem",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    padding: "1.6rem",
    fontSize: "1rem",
    justifyContent: "space-between",
  },
  postedBy: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.4rem",
  },
  icon: {
    margin: "4% 2% 0 0",
  },
  avatarIcon: {
    fontSize: "2.75rem",
    margin: "0 .8rem 0 1.2rem",
  },
  cardActions: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
  comment: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    padding: "1.2rem 1.6rem",
  },
  cta: {
    fontSize: "1.4rem",
    color: "black",
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
    fontSize: "3rem",
    paddingRight: "0rem",
    // marginRight: "3rem",
    textTransform: "none",
  },
  commentBox: {
    width: "100%",
    marginLeft: ".8rem",
    lineHeight: ".6rem",
    display: "flex",
    justifyContent: "space-between",
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
    transform: "rotate(40deg)",
  },
  thumbupIcon: {
    marginRight: "1rem",
  },
  commentIcon: {
    marginRight: "1rem",
  },
  editDeleteBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    padding: "none",
    background: "none",
    backgroundColor: "none",
    border: "none",
  },
  deleteBtn: {
    padding: "none",
    background: "none",
    backgroundColor: "none",
    border: "none",
    fontSize: "1rem",
  },
  comments: {
    margin: "1rem 0 .75rem 1.6rem",
    textTransform: "none",
    fontSize: "2rem",
    color: "#2962FF",
    fontWeight: "bold",
  },
  submitIcon: {
    color: "#2962FF",
    fontSize: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  postInfoBox: {
    display: "flex",
    flexDirection: "column",
    "& p": {
      marginTop: "0rem",
      marginBottom: "0rem",
      fontSize: "1.4rem",
    },
  },
  nameTimeBox: {
    display: "flex",
    alignItems: "center",
  },
  circleIcon: {
    color: "gray",
    fontSize: ".5rem",
    marginLeft: ".4rem",
    marginRight: ".4rem",
  },
  commentTime: {
    fontSize: "1.4rem",
    color: "gray",
  },
  likesCommentsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  likesComments: {
    fontSize: "1.5rem",
  },
  likeBox: {
    display: "flex",
    alignItems: "center"
  },
 commentsBox: {
   display: "flex",
   alignItems: "center"
 }
}));

export default function NewsfeedCard({
  post,
  user,
  refetchPosts,
  profile,
  pinnedPost,
}) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [toggleCommentOverflow, setToggleCommentOverflow] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post.body);
  const navigate = useNavigate();

  const { data: comments, loading, error, refetch } = useQuery(
    GET_NEWSFEED_COMMENTS,
    {
      variables: {
        id: post.id,
      },
    }
  );

  const {
    data: commentSub,
    loading: commentsLoading,
    error: commentSubError,
  } = useSubscription(NEWSFEED_COMMENT_SUBSCRIPTION);

  const [deleteNewsfeedPost] = useMutation(DELETE_NEWSFEED_POST);
  const [pinFeedPost] = useMutation(PIN_NEWSFEED_POST);
  const [createComment] = useMutation(CREATE_NEWSFEED_COMMENT);
  const [addLike] = useMutation(CREATE_NEWSFEED_LIKE);
  const [removeLike] = useMutation(DELETE_NEWSFEED_LIKE);
  const [updatePost] = useMutation(UPDATE_NEWSFEED_POST);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const toggleComment = () => {
    setCommenting(!commenting);
  };
  const addComment = async () => {
    await createComment({
      variables: {
        body: commentText,
        email: user.email,
        id: post.id,
      },
    });
    setCommentText("");
  };

  const editPost = async () => {
    await updatePost({
      variables: {
        id: post.id,
        body: postToEdit,
      },
    });
    setEditing(false);
  };

  // const deleteFeedComment = async comment => {
  //   await deleteComment({
  //     variables: {
  //       id: comment.id,
  //     },
  //   });
  //   refetch();
  // };

  const hasLiked = () => {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].likedBy.email === user.email) {
        return post.likes[i].id;
      }
    }
    return false;
  };

  const toggleLiked = async () => {
    const likesId = await hasLiked();
    if (!likesId) {
      await addLike({
        variables: {
          postID: post.id,
          likedBy: user.email,
        },
      });
    } else {
      await removeLike({
        variables: {
          id: likesId,
        },
      });
    }
    refetchPosts();
  };

  const deletePost = async () => {
    await deleteNewsfeedPost({
      variables: {
        id: post.id,
      },
    });
  };

  const pinPost = async () => {
    if (!pinnedPost) {
      await pinFeedPost({
        variables: {
          id: post.id,
          pinnedPost: true,
        },
      });
    } else {
      await pinFeedPost({
        variables: {
          id: pinnedPost.id,
          pinnedPost: false,
        },
      });
      await pinFeedPost({
        variables: {
          id: post.id,
          pinnedPost: true,
        },
      });
    }
    refetchPosts();
  };

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  !commentsLoading && refetch();

  const props = {
    inputProps: {
      "aria-label": "Type a comment here to this post.",
    },
  };

  return !pinnedPost || (pinnedPost && pinnedPost.id !== post.id) ? (
    <Card className={classes.root}>
      <CardActions className={classes.postHeader}>
        <div className={classes.postedBy}>
          {post?.postedBy?.profilePicture ? (
            <button
              className={classes.btn}
              aria-label={`visit the profile page of ${post.postedBy.firstName}`}
            >
              <CustomMessageIcon
                pictureIcon={post.postedBy.profilePicture}
                myProfileUsername={post.postedBy.userName}
              />
            </button>
          ) : (
              <button
                className={classes.btn}
                aria-label={`visit the profile page of ${post.postedBy.firstName}`}
                onClick={() => navigate(`/user/${post.postedBy.userName}`)}
              >
                <AccountCircleIcon
                  fontSize={"large"}
                  className={classes.avatarIcon}
                />
              </button>
            )}
          <Box className={classes.postInfoBox}>
            <Typography gutterBottom>
              {post.postedBy.firstName} {post.postedBy.lastName}
            </Typography>
            <Typography>
              {moment(post.createdAt)
                .startOf("hour")
                .fromNow()}
            </Typography>
          </Box>
        </div>
        {user?.email === post?.postedBy?.email ||
          (user && user[config.roleUrl].includes("Admin")) ? (
            <div className={classes.editDeleteBtn}>
              {/* {user && user[config.roleUrl].includes("Admin") ? (
              <Button className={classes.btn} onClick={pinPost}>
                <FontAwesomeIcon icon={faThumbtack} className={classes.icons} />
              </Button>
            ) : null} */}
              <Button
                className={classes.btn}
                onClick={() => setEditing(!editing)}
                aria-label="edit this post"
              >
                <EditOutlinedIcon color="action" fontSize="large" />
              </Button>
              <Button
                onClick={deletePost}
                className={classes.btn}
                aria-label="delete this post"
              >
                <DeleteOutlineIcon color="action" fontSize="large" />
              </Button>
            </div>
          ) : null}
      </CardActions>
      <CardActions className={classes.postBody}>
        {post.imgUrl ? (
          <CardMedia
            component="img"
            className={classes.img}
            alt="description of post image"
            image={post.imgUrl}
          />
        ) : null}
        <CardContent>
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
                  e.key === "Enter" && postToEdit !== "" ? editPost() : null
                }
                onChange={e => setPostToEdit(e.target.value)}
                value={postToEdit}
                placeholder="Edit your post..."
                aria-label="Edit your post, then hit enter to send"
                InputProps={{
                  endAdornment: (
                    <Button
                      position="end"
                      aria-label="edit post"
                      onClick={postToEdit !== "" && editPost}
                    >
                      <Tooltip title="Edit Post">
                        <SendIcon className={classes.submitIcon} />
                      </Tooltip>
                    </Button>
                  ),
                }}
              />
            </>
          ) : (
              <p className={post.imgUrl ? classes.post : classes.soloPost}>
                {post.body}
              </p>
            )}
        </CardContent>
      </CardActions>
      {/* <CardContent className={classes.likesCommentsBox}>
        <p className={classes.likesComments}>
          {post.likes.length === 1
            ? "1 Like"
            : post.likes.length > 1
              ? `${post.likes.length} Likes`
              : null}
          {/* {hasLiked()
              ? post.likes.length === 1
                ? "1 Like"
                : `${post.likes.length} Likes`
              : `Like`} */}
        {/* </p>
        <p className={classes.likesComments}>
          {comments.feedComments.length === 1
            ? "1 Comment"
            : comments.feedComments.length > 1
              ? `${comments.feedComments.length} Comments`
              : null}
        </p>
      </CardContent> */} 
      <Divider variant="middle" />
      <CardActions className={classes.cardActions}>
        <Box className={classes.likeBox}>
          <Button
            color="primary"
            className={classes.button}
            onClick={toggleLiked}
          >
            {hasLiked() ? (
              <>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={classes.thumbupIcon}
                />
                <Typography className={classes.cta}>Liked</Typography>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={farFaThumbsUp}
                  className={classes.thumbupIcon}
                />
                <Typography className={classes.cta}>Like</Typography>
              </>
            )}
          </Button>
          <CircleIcon className={classes.circleIcon} />
          <p className={classes.likesComments}>
            {post.likes.length === 0
              ? "0"
              : post.likes.length > 0
              ? `${post.likes.length}`
              : null}
          </p>
        </Box>
        <Box className={classes.commentsBox}>

        <Button
          color="primary"
          className={classes.button}
          onClick={toggleComment}
        >
          <FontAwesomeIcon
            icon={faCommentAlt}
            className={classes.commentIcon}
          />
          <Typography className={classes.cta}>Comment</Typography>
        </Button>
        <CircleIcon className={classes.circleIcon}/>
        <p className={classes.likesComments}>
          {comments.feedComments.length === 0
            ? "0"
            : comments.feedComments.length > 0
            ? `${comments.feedComments.length}`
            : null}
        </p>
        </Box>
      </CardActions>

      <Divider variant="middle" />
      {commenting ? (
        <div className={classes.comment}>
          <TextField
            {...props}
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
            InputProps={{
              endAdornment: (
                <Button
                  position="end"
                  aria-label="create comment"
                  onClick={commentText !== "" && addComment}
                >
                  <Tooltip title="Create Comment">
                    <SendIcon className={classes.submitIcon} />
                  </Tooltip>
                </Button>
              ),
            }}
          />
        </div>
      ) : null}

      {comments &&
        comments.feedComments.map((comment, i) => (
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
              <button className={classes.btn}>
                <CustomMessageIcon
                  pictureIcon={comment.postedBy.profilePicture}
                  myProfileUsername={comment.postedBy.userName}
                />
              </button>
            ) : (
                <button
                  className={classes.btn}
                  aria-label={`visit the profile page of ${comment.postedBy.firstName}`}
                  onClick={() => navigate(`/user/${comment.postedBy.userName}`)}
                >
                  <AccountCircleIcon
                    fontSize={"large"}
                    className={classes.avatarIcon}
                  />
                </button>
              )}

            <div className={classes.commentBox}>
              <div>
                <Box className={classes.nameTimeBox}>
                  {comment?.postedBy?.type === "Individual" ? (
                    <Typography className={classes.commentName}>
                      {comment?.postedBy?.firstName}{" "}
                      {comment?.postedBy?.lastName}
                    </Typography>
                  ) : (
                    <Typography className={classes.commentName}>
                      {comment?.postedBy?.extProfile?.orgName}
                    </Typography>
                  )}

                  <CircleIcon className={classes.circleIcon} />
                  <Typography className={classes.commentTime}>
                    {moment(comment.createdAt)
                      .startOf("hour")
                      .fromNow()}
                  </Typography>
                </Box>
                <Typography className={classes.commentContent} gutterBottom>
                  {comment?.body}
                </Typography>
              </div>
              {user?.email === comment?.postedBy?.email ? (
                <div>
                  <Button
                    onClick={async () => {
                      await deleteComment({
                        variables: {
                          id: comment.id,
                        },
                      });
                    }}
                    className={classes.deleteBtn}
                    aria-label="delete this comment"
                  >
                    <Tooltip title="Delete this comment">
                      <DeleteOutlineIcon color="action" fontSize="large" />
                    </Tooltip>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ))}

      {comments?.feedComments?.length > 3 ? (
        <Button
          onClick={() => setToggleCommentOverflow(!toggleCommentOverflow)}
          className={classes.comments}
        >
          {toggleCommentOverflow ? "Hide Comments" : "Show More Comments"}
        </Button>
      ) : null}
    </Card>
  ) : null;
}
