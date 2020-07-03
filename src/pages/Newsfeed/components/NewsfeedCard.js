import React, { useState } from "react";
import config from "../../../config/auth_config";
// Import graphql
import { useQuery, useMutation, useSubscription } from "react-apollo";
import {
  CREATE_NEWSFEED_COMMENT,
  GET_NEWSFEED_COMMENTS,
  NEWSFEED_COMMENT_SUBSCRIPTION,
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
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
  Icon,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

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
    maxWidth: "40%",
    borderRadius: "5px",
  },
  post: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "0",
    paddingRight: "1.6rem",
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
  postedByName: {
    marginTop: ".5rem",
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
    alignItems: "center",
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
    fontSize: "1rem",
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
  editDeleteBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    padding: "none",
  },
  comments: {
    margin: "1rem 0 .75rem 1.6rem",
    textTransform: "none",
    fontSize: "2rem",
    color: "#2962FF",
    fontWeight: "bold",
  },
}));

export default function NewsfeedCard(props) {
  const classes = useStyles();
  const { post, user, refetchPosts, profile, pinnedPost } = props;
  const [commentText, setCommentText] = useState("");
  const [toggleCommentOverflow, setToggleCommentOverflow] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post.body);

  const { data: comments, loading, error, refetch } = useQuery(
    GET_NEWSFEED_COMMENTS,
    {
      variables: {
        id: post.id,
      },
      skip: !post.id,
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

  return !pinnedPost || (pinnedPost && pinnedPost.id !== post.id) ? (
    <Card className={classes.root}>
      <CardActions className={classes.postHeader}>
        <div className={classes.postedBy}>
          {post?.postedBy?.profilePicture ? (
            <CustomMessageIcon pictureIcon={post.postedBy.profilePicture} />
          ) : (
            <AccountCircleIcon
              fontSize={"large"}
              className={classes.avatarIcon}
            />
          )}
          <Typography className={classes.postedByName} gutterBottom>
            {post.postedBy.firstName} {post.postedBy.lastName}
          </Typography>
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
            >
              <EditOutlinedIcon color="action" fontSize="large" />
            </Button>
            <Button onClick={deletePost} className={classes.btn}>
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
              />
            </>
          ) : (
            <p className={post.imgUrl ? classes.post : classes.soloPost}>
              {post.body}
            </p>
          )}
        </CardContent>
      </CardActions>
      <Divider variant="middle" />

      <CardActions className={classes.cardActions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={toggleLiked}
        >
          <ThumbUpAltIcon fontSize={"large"} className={classes.icon} />
          <span className={classes.cta}>
            {hasLiked() ? `${post.likes.length} Likes` : `Like`}
          </span>
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

      {/* <CardActionArea className={classes.postHeader}>
        <button onClick={showComments}>
          <p>
            {comments && comments.feedComments.length === 0
              ? `No`
              : `${comments.feedComments.length}`}{" "}
            comments
          </p>
        </button>
      </CardActionArea>

      <Divider variant="middle" /> */}

      {commenting ? (
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
          className={classes.comments}
        >
          {toggleCommentOverflow ? "Hide Comments" : "Show More Comments"}
        </Button>
      ) : null}
    </Card>
  ) : null;
}

// <div className={classes.dropdownContainer}>
//   <button
//     type="button"
//     className={classes.header}
//     onClick={() => setDisplayDropdown(!displayDropdown)}
//   >
//     {displayDropdown ? (
//       <FontAwesomeIcon icon={faAngleUp} className={classes.icons} />
//     ) : (
//       <FontAwesomeIcon icon={faAngleDown} className={classes.icons} />
//     )}
//   </button>
//   {displayDropdown && (
//     <div className={classes.editDeleteBtn}>
//       <Button className={classes.btn}>
//         <EditOutlinedIcon color="action" fontSize="large" />
//       </Button>
//       <Button onClick={deletePost} className={classes.btn}>
//         <DeleteOutlineIcon color="action" fontSize="large" />
//       </Button>
//       {user && user[config.roleUrl].includes("Admin") ? (
//         <Button className={classes.btn} onClick={pinPost}>
//           <PinDropOutlinedIcon color="action" fontSize="large" />
//         </Button>
//       ) : null}
//     </div>
//   )}
// </div>;
