import React, { useEffect } from "react";

import { UPDATE_PROFILE_BANNER, GET_PROFILE_IMAGES } from "./queries";
import { useQuery, useMutation } from "react-apollo";

//Reach Router imports
// import { useParams } from "@reach/router";

import BannerDefault from "../../assets/images/DefaultBannerPhoto.png";

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

export default function ProfileBanner({ profileBanner, userName }) {
  // const { userName } = useParams();
  const classes = useStyles();
  const { user } = useAuth0();
  const [updateProfileBanner] = useMutation(UPDATE_PROFILE_BANNER);
  const { data, error, loading, refetch } = useQuery(GET_PROFILE_IMAGES, {
    variables: {
      userName: userName,
    },
  });
  const usersProfileBanner = data?.profile?.profileBanner;

  useEffect(() => {
    if (profileBanner && profileBanner !== null)
      updateProfileBanner({
        variables: {
          userName: userName,
          profileBanner: profileBanner,
        },
      });
    refetch();
  }, [refetch, profileBanner, usersProfileBanner]);

  return (
    <>
      <img
        className={classes.profileBanner}
        src={
          usersProfileBanner === null ||
          usersProfileBanner === undefined ||
          usersProfileBanner === ""
            ? BannerDefault
            : usersProfileBanner
        }
        alt="Profile Banner"
      />
    </>
  );
}
