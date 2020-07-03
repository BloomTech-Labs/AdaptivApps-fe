import React, { useState } from "react";
import config from "../../../config/auth_config";
import { useMutation } from "react-apollo";
import { PIN_NEWSFEED_POST } from "../queries/FeedPost";
// Component Imports
import CustomMessageIcon from "../../Chat/components/Messages/CustomMessageIcon";

// Styling Imports
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

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

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    width: "64.8rem",
    backgroundColor: "#F5F5F5",
    paddingBottom: "1rem",
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
    fontSize: "3rem",
    fontWeight: "bold",
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
    display: "flex",
    alignSelf: "flex-end",
    color: "black",
  },
  editDeleteBtn: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    marginTop: "3rem",
    marginLeft: "-2rem",
  },
  btn: {
    padding: "none",
  }
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
  const [pinFeedPost] = useMutation(PIN_NEWSFEED_POST);
  const [commenting, setCommenting] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const editPost = () => {
    //edit post logic
  };

  const unpinPost = () => {
    // unpin post logic
  };

  const toggleComment = () => {
    setCommenting(!commenting);
  };

  const pinPost = async () => {
    await pinFeedPost({
      variables: {
        id: pinnedPost.id,
        pinnedPost: !pinnedPost.pinnedPost
      }
    })
    refetchPosts();
  }

  return (
    <>
      {pinnedPost ? <Card className={classes.root}>
        <CardActionArea className={classes.postHeader}>
          <Typography variant="h3" color="secondary" className={classes.label}>
            Angel City Sports Pinned Post
          </Typography>
          <div className={classes.pinnedBy}>
            <div className={classes.acs}>
              <CustomMessageIcon pictureIcon={pinnedPost?.postedBy.profilePicture} />
              <p>{pinnedPost?.postedBy.firstName} {pinnedPost?.postedBy.lastName}</p>
            </div>
            {user?.email === pinnedPost?.postedBy?.email ? (
              <div className={classes.dropdownContainer}>
                <button type="button" className={classes.header} onClick={() => setDisplayDropdown(!displayDropdown)}>
                  {displayDropdown
                    ? <FontAwesomeIcon icon={faAngleUp} className={classes.icons} />
                    : <FontAwesomeIcon icon={faAngleDown} className={classes.icons} />}
                </button>
                {displayDropdown && (
                  <div className={classes.editDeleteBtn}>
                    <Button className={classes.btn}>
                      <EditOutlinedIcon color="action" fontSize="large" />
                    </Button>
                    <Button className={classes.btn}>
                      <DeleteOutlineIcon color="action" fontSize="large" />
                    </Button>
                    {user && user[config.roleUrl].includes("Admin") ? (
                      <Button className={classes.btn} onClick={pinPost}>
                        <PinDropOutlinedIcon color="action" fontSize="large" />
                      </Button>
                    ) : null}
                  </div>
                )}
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
          <Typography className={classes.postBody}>
            {pinnedPost.body}
          </Typography>
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
      </Card> : null}
    </>
  );
}

// <Card className={classes.root}>
//   {post.imgUrl ? (
//     <div>
//       <CardActionArea className={classes.postHeader}>
//         <AccountCircleIcon fontSize={"large"} className={classes.icon} />
//         <Typography gutterBottom>
//           {post.postedBy.firstName} {post.postedBy.lastName}
//         </Typography>
//       </CardActionArea>
//       <CardActionArea className={classes.postBody}>
//         <CardMedia
//           component="img"
//           className={classes.img}
//           alt="description of post image"
//           image={post.imgUrl}
//         />
//         <CardContent className={classes.post}>
//           <p>{post.body}</p>
//         </CardContent>
//       </CardActionArea>
//     </div>
//   ) : (
//     <div>
//       <CardActionArea className={classes.postHeader}>
//         <AccountCircleIcon fontSize={"large"} className={classes.icon} />
//         <Typography gutterBottom>
//           {post.postedBy.firstName} {post.postedBy.lastName}
//         </Typography>
//       </CardActionArea>
//       <CardContent className={classes.soloPost}>
//         <p>{post.body}</p>
//       </CardContent>
//     </div>
//   )}

// <Divider variant="middle" />

// <CardActions className={classes.cardActions}>
//   <Button color="primary" className={classes.button}>
//     <ThumbUpAltIcon fontSize={"large"} className={classes.icon} />
//     Like
//   </Button>
//   <Button color="primary" className={classes.button} onClick={toggleComment}>
//     <ModeCommentIcon fontSize={"large"} className={classes.icon} />
//     Comment
//   </Button>
// </CardActions>

// <Divider variant="middle" />

//   <CardActionArea className={classes.postHeader}>
//     <button onClick={showComments}>
//       <p>
//         {comments && comments.feedComments.length === 0
//           ? `No`
//           : `${comments.feedComments.length}`}{" "}
//         comments
//       </p>
//     </button>
//   </CardActionArea>

//   <Divider variant="middle" />

//   {commenting ? (
//     <div className={classes.comment}>
//       <AccountCircleIcon fontSize={"large"} className={classes.icon} />
//       <TextField
//         size="small"
//         variant="outlined"
//         multiline
//         className={classes.input}
//         placeholder="Write a comment..."
//       />
//       <Button color="primary" className={classes.button}>
//         <KeyboardReturnIcon fontSize={"large"} className={classes.icon} />
//         Submit
//       </Button>
//     </div>
//   ) : null}

//   <Divider variant="middle" />

//   {comments && displayComments
//     ? comments.feedComments.map(comment => (
//         <div key={comment.id}>
//           <p>{`${comment.postedBy.firstName} says: ${comment.body}`}</p>
//         </div>
//       ))
//     : null}
// </Card>;
