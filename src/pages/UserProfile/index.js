import React, { useState, useEffect } from "react";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

//Reach Router imports
import { useParams } from "@reach/router";

//s3 bucket imports
import S3FileUpload from "react-s3";

// Material-UI imports
import { Typography, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useQuery, useMutation } from "react-apollo";

import { UPDATE_PROFILE_PICTURE, GET_USER_PROFILE } from "./queries";
import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const { userName } = useParams();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);

  const { data: userProfile, loading, error, refetch } = useQuery(
    GET_USER_PROFILE,
    {
      variables: { userName: userName },
    }
  );

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
        if (data && data?.location) {
          await setProfilePicture(data && data?.location);
        } else {
          console.log("loading");
        }
      })
      .catch(async err => {
        console.log(err);
      });
  };

  const uploadProfileBanner = async e => {
    console.log(e.target.files[0]);
    await S3FileUpload.uploadFile(e.target.files[0], profileBannerConfig)
      .then(async data => {
        if (data && data?.location) {
          await setProfileBanner(data && data?.location);
        } else {
          console.log("loading");
        }
      })
      .catch(async err => {
        console.log(err);
      });
  };

  useEffect(() => {}, [userProfile, profilePicture, profileBanner]);

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
      {/*input for uploading profile banner */}
      <div>
        <label htmlFor="uploadBanner">
          <IconButton
            color="primary"
            aria-label="Upload Profile Picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <input
          className={classes.input}
          accept="image/*"
          type="file"
          onChange={uploadProfileBanner}
          id="uploadBanner"
        />
      </div>
      <ProfileBanner profileBanner={profileBanner} />
      {/*input for uploading profile picture */}
      <div>
        <label htmlFor="uploadPicture">
          <IconButton
            color="primary"
            aria-label="Upload Profile Banner Image"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <input
          className={classes.input}
          accept="image/*"
          type="file"
          onChange={uploadProfilePicture}
          id="uploadPicture"
        />
      </div>
      <ProfilePic profilePicture={profilePicture} />
    </div>

    //   )}
    // </>
  );
}
