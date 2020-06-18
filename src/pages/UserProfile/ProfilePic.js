import React, { useEffect } from "react";

import { UPDATE_PROFILE_PICTURE, GET_PROFILE_IMAGES } from "./queries";
import { useQuery, useMutation } from "react-apollo";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

export default function ProfilePicture({ profilePicture }) {
  const { user } = useAuth0();
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
  const { data, error, loading, refetch } = useQuery(GET_PROFILE_IMAGES, {
    variables: {
      email: user?.email,
    },
  });
  const usersProfilePicture = data?.profile?.profilePicture;
  useEffect(() => {
    if (profilePicture && profilePicture !== null)
      updateProfilePicture({
        variables: {
          email: user?.email,
          profilePicture: profilePicture,
        },
      });
    refetch();
  }, [refetch, profilePicture, usersProfilePicture]);

  // console.log("profile picture in Profile picture", profilePicture);
  // console.log("user profile in Profile picture", data);
  // console.log("users profile picture", usersProfilePicture);
  return (
    <div>
      <img
        // className={classes.profilePic}
        src={usersProfilePicture}
        alt="Profile Picture"
        style={{ "width": "300px" }}
      />
    </div>
  );
}
