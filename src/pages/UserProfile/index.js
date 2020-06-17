import React, { useState, useEffect } from "react";
// Material-UI imports
import { Typography } from "@material-ui/core";
import { UPDATE_PROFILE_PICTURE, GET_USER_PROFILE } from "./queries";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

//s3 bucket imports
import S3FileUpload from "react-s3";

import { useParams } from "@reach/router";
import { useQuery, useMutation } from "react-apollo";

import CircularProgress from "@material-ui/core/CircularProgress";
//upload profile picture functionality

export default function UserProfile() {
  const { userName } = useParams();
  const { user } = useAuth0();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
  const { data: userProfile, loading, error, refetch } = useQuery(
    GET_USER_PROFILE,
    {
      variables: { userName: userName },
    }
  );

  const userEmail = user.email;

  //config options for uploading a profile picture
  const profilePictureConfig = {
    bucketName: process.env.REACT_APP_AWS_IMAGE_BUCKET_NAME,
    dirName: `users/${userName}/profile_pictures`,
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };
  //config options for uploading a profile banner
  const profileBannerConfig = {
    bucketName: process.env.REACT_APP_AWS_IMAGE_BUCKET_NAME,
    dirName: `users/${userName}/profile_banners`,
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  const uploadProfilePicture = async e => {
    console.log(e.target.files[0]);
    await S3FileUpload.uploadFile(e.target.files[0], profilePictureConfig)
      .then(async data => {
        console.log(data.location);
        if (data && data?.location) {
          await setProfilePicture(data && data?.location);
          // await updateProfilePicture({
          //   variables: {
          //     email: userEmail,
          //     profilePicture: profilePicture,
          //   },
          // });
        } else {
          console.log("loading");
        }
      })
      .catch(async err => {
        console.log(err);
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch, profilePicture, profileBanner]);
  console.log("profile picture", profilePicture);

  const uploadProfileBanner = async e => {
    console.log(e.target.files[0]);
    await S3FileUpload.uploadFile(e.target.files[0], profileBannerConfig)
      .then(async data => {
        console.log(data.location);
        if (data && data?.location) {
          await setProfileBanner();
          // await updateProfilePicture({
          //   variables: {
          //     email: userEmail,
          //     profilePicture: profilePicture,
          //   },
          // });
        } else {
          console.log("loading");
        }
      })
      .catch(async err => {
        console.log(err);
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;
  return (
    // <>
    //   {data.profile.private === true || data.profile.userName === null ? (
    //     <p>
    //       {" "}
    //       Sorry this user has not set up their account yet, or their profile is
    //       set to private.
    //     </p>
    //   ) : (
    <div>
      {/*input for uploading profile picture */}
      <div>
        <input type="file" onChange={uploadProfilePicture} />
      </div>
      {/*input for uploading profile banner */}
      <div>
        <input type="file" onChange={uploadProfileBanner} />
      </div>
    </div>
    //   )}
    // </>
  );
}
