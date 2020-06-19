import React, { useEffect } from 'react';
// import { useAuth0 } from "../../config/react-auth0-spa";
import { useQuery } from "react-apollo";
import { GET_NEWSFEED_POSTS } from '../queries/FeedPost';
// Import components
import NewsfeedCard from './NewsfeedCard';
import SpotlightBar from './SpotlightBar';
// Import stylings
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: '75%',
  },
  container: {
    display: 'flex',
    margin: '5% auto',
    justifyContent: 'space-evenly',

  },
  newsfeed: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    overflow: "scroll",
    overflow: "scroll",
    overflow: "scroll",
  },
  spotlight: {
    width: '40%',
  }
}))


export default function NewsfeedPage() {
  const classes = useStyles();
  const { data, loading, error, refetch } = useQuery(GET_NEWSFEED_POSTS);
  const posts = data?.feedPosts;
  console.log(posts);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.newsfeed}>
          {posts.map(post => (
            <NewsfeedCard post={post} key={post.id} />
          ))}
        </div>
        <div className={classes.spotlight}>
          <SpotlightBar />
        </div>
      </div>
    </div>
  )
}