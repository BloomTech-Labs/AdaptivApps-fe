import React, { useEffect } from "react";

import { UPDATE_PROFILE_BANNER, GET_PROFILE_IMAGES } from "./queries";
import { useQuery, useMutation } from "react-apollo";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Material-UI imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },

  profileBanner: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export default function ProfileBanner({ profileBanner }) {
  const classes = useStyles();
  const { user } = useAuth0();
  const [updateProfileBanner] = useMutation(UPDATE_PROFILE_BANNER);
  const { data, error, loading, refetch } = useQuery(GET_PROFILE_IMAGES, {
    variables: {
      email: user?.email,
    },
  });
  const usersProfileBanner = data?.profile?.profileBanner;

  useEffect(() => {
    if (profileBanner && profileBanner !== null)
      updateProfileBanner({
        variables: {
          email: user?.email,
          profileBanner: profileBanner,
        },
      });
    refetch();
  }, [refetch, profileBanner, usersProfileBanner]);

  // console.log("profile banner in Profile Banner", profileBanner);
  // console.log("data in Profile Banner", data);
  // console.log("users profile Banner", usersProfileBanner);
  return (
    <>
      <img
        className={classes.profileBanner}
        src={usersProfileBanner}
        alt="Profile Banner"
      />
    </>
  );
}
