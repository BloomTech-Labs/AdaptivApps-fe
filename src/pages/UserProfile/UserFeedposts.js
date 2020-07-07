import React, { useEffect } from "react";
import NewsfeedCard from "../Newsfeed/components/NewsfeedCard";

// Import queries
import { useQuery } from "react-apollo";
import { GET_USER_POSTS, GET_MY_PROFILE } from "./queries";
// Import stylings
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "4rem auto 4rem auto",
  },
  title: {
    fontSize: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
  },
}));

export default function UserFeedposts({ user, userName }) {
  const classes = useStyles();

  const { data, loading, error, refetch } = useQuery(GET_USER_POSTS, {
    variables: { userName: userName },
  });

  const { data: profile } = useQuery(GET_MY_PROFILE, {
    variables: { email: user.email },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>My Community Posts</h3>
      {data?.feedPosts?.map((post, index) => (
        <NewsfeedCard
          post={post}
          key={index}
          user={user}
          refetchPosts={refetch}
          profile={profile?.profile}
        />
      ))}
    </div>
  );
}
