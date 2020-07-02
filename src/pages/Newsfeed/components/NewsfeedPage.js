import React from "react";
import { useAuth0 } from "../../../config/react-auth0-spa";
import { useQuery, useSubscription } from "react-apollo";
import {
  GET_NEWSFEED_POSTS,
  NEWSFEED_POST_SUBSCRIPTION,
  GET_MY_PROFILE,
} from "../queries";
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
    display: "flex",
    justifyContent: "space-between",
  },
  bannerSearchNewsfeed: {
    width: "92rem",
    display: "flex-column",
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
  spotlight: {
    width: "35%",
  },
  endOfPosts: {
    margin: '4% 0',
    textAlign: 'center',
    color: '#2962FF',
    fontWeight: 'bold'
  }
}));

export default function NewsfeedPage() {
  const classes = useStyles();
  const { user } = useAuth0();
  const { data, loading, error, refetch } = useQuery(GET_NEWSFEED_POSTS);
  const { data: profile } = useQuery(GET_MY_PROFILE, {
    variables: { email: user.email },
  });
  const {
    data: newsFeedSubsData,
    loading: newsFeedSubsLoading,
    error: newsFeedSubsError,
  } = useSubscription(NEWSFEED_POST_SUBSCRIPTION);
  let posts = data?.feedPosts;

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;
  if (newsFeedSubsError) return `newsFeedSubsError! ${error.newsFeedSubsError}`;
  !newsFeedSubsLoading && refetch();

  console.log(profile);
  return (
    <div className={classes.root}>
      <div className={classes.bannerSearchNewsfeed}>
        <SponsorBanner />
        <div className={classes.search}>
          <GlobalSearchBox />
        </div>
        <div className={classes.newsfeed}>
          <CreatePost user={profile?.profile} />
          <PinnedPost user={user} />
          {posts.map((post, index) => (
            <NewsfeedCard post={post} key={post.id} user={user} />
          ))}
          <Typography className={classes.endOfPosts}>You've reached the end!</Typography>
        </div>
      </div>
      <div className={classes.spotlight}>
        <SpotlightBar />
      </div>
    </div>
  );
}
