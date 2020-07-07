import React, { useState } from "react";
import { useAuth0 } from "../../../config/react-auth0-spa";
import { useQuery, useSubscription } from "react-apollo";
import { GET_MY_PROFILE } from "../queries";
import {
  GET_NEWSFEED_POSTS,
  NEWSFEED_POST_SUBSCRIPTION,
} from "../queries/FeedPost.js";
// Import components
import CreatePost from "./CreatePost";
import PinnedPost from "./PinnedPost";
import NewsfeedCard from "./NewsfeedCard";
import SpotlightBar from "./SpotlightBar";
import SponsorBanner from "../../SponsorSpotlight/SponsorBanner";
import GlobalSearchBox from "../../../routes/DashRouter/GlobalSearchBox";

// Import stylings
import { makeStyles, Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bannerSearchNewsfeed: {
    margin: "0 auto",
    width: "70%",
    display: "flex-column",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  search: {
    zIndex: 100,
    //position: "absolute",
    margin: "2.4rem 0 0 30%",
    // "@media (max-width: 850px)": {
    //   display: "none",
    // },
  },
  container: {
    display: "flex",
    margin: "5% auto",
    justifyContent: "space-evenly",
  },
  newsfeed: {
    width: "100%",
    margin: "auto",
    // display: "flex",
    // flexDirection: "column",
    // overflow: "scroll",
    // overflow: "scroll",
    // overflow: "scroll",
  },

  endOfPosts: {
    margin: "4% 0",
    textAlign: "center",
    color: "#2962FF",
    fontWeight: "bold",
  },
}));

export default function NewsfeedPage() {
  const classes = useStyles();
  const { user } = useAuth0();

  const { data: profile } = useQuery(GET_MY_PROFILE, {
    variables: { email: user.email },
  });
  const { data, loading, error, refetch: refetchPosts } = useQuery(
    GET_NEWSFEED_POSTS
  );

  const {
    data: newsFeedSubsData,
    loading: newsFeedSubsLoading,
    error: newsFeedSubsError,
  } = useSubscription(NEWSFEED_POST_SUBSCRIPTION);
  let posts = data?.feedPosts;

  const findPinnedPost = () => {
    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].pinnedPost) {
          return posts[i];
        }
      }
      return false;
    }
    return false;
  };

  const pinnedPost = findPinnedPost();

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;
  if (newsFeedSubsError) return `newsFeedSubsError! ${error.newsFeedSubsError}`;
  !newsFeedSubsLoading && refetchPosts();

  return (
    <div className={classes.root}>
      <SponsorBanner />
      <div className={classes.bannerSearchNewsfeed}>
        <div className={classes.search}>
          <GlobalSearchBox />
        </div>
        <div className={classes.newsfeed}>
          <CreatePost user={user} profile={profile?.profile} />
          {/* <PinnedPost
            user={user}
            pinnedPost={pinnedPost}
            refetchPosts={refetchPosts}
          /> */}
          {posts.map((post, index) => (
            <NewsfeedCard
              post={post}
              key={index}
              user={user}
              refetchPosts={refetchPosts}
              profile={profile?.profile}
              pinnedPost={pinnedPost}
            />
          ))}
          <Typography className={classes.endOfPosts}>
            You've reached the end!
          </Typography>
        </div>
      </div>
    </div>
  );
}
