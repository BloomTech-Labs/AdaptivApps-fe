import React, { useEffect } from "react";

import { UPDATE_PROFILE_BANNER, GET_PROFILE_IMAGES } from "./queries";
import { useQuery, useMutation } from "react-apollo";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

export default function ProfileBanner({ profileBanner }) {
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

  console.log("profile banner in Profile Banner", profileBanner);
  console.log("data in Profile Banner", data);
  console.log("users profile Banner", usersProfileBanner);
  return (
    <div>
      <img
        // className={classes.profilePic}
        src={usersProfileBanner}
        alt="Profile Banner"
        style={{ "width": "800px" }}
      />
    </div>
  );
}
