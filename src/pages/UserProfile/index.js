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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useQuery } from "react-apollo";

import { GET_USER_PROFILE } from "./queries";
import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";
import UpcomingEventList from "./UpcomingEventList";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  icons: {
    fontSize: "3rem",
  },
  EverythingContainer: {
    display: "flex",
  },
  bannerWrapper: {
    "& label": {
      position: "absolute",
      top: "14rem",
      left: "90%",
    },
  },
  photoIcon: {
    fontSize: "3rem",
    position: "absolute",
    color: "black",
    background: "white",
    borderRadius: "50%",
  },
  pictureWrapper: {
    "& label": {
      position: "absolute",
      left: "50%",
    },
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

  const extendedProfile = userProfile?.profile?.extProfile;
  const disability = userProfile?.profile?.extProfile?.disability;
  const demographicProfile = userProfile?.profile?.demographicProfile;
  const sportsParticipation =
    userProfile?.profile?.demographicProfile?.sportsParticipation;

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
    // console.log(e.target.files[0]);
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
    // console.log(e.target.files[0]);
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

  const filteredKeys = [];

  const filtered =
    userProfile &&
    sportsParticipation &&
    Object.entries(sportsParticipation).filter(
      filteredKey =>
        filteredKey.includes(true) && filteredKeys.push(filteredKey[0])
    );

  useEffect(() => { }, [userProfile, profilePicture, profileBanner]);

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
    <div className={classes.EverythingContainer}>
      <div className={classes.ProfileWrapper}>
        <div className={classes.topProfileWrapper}>
          {/*input for uploading profile banner */}
          <div className={classes.bannerWrapper}>
            <label htmlFor="uploadBanner">
              <IconButton
                className={classes.photoButton}
                color="primary"
                size="medium"
                aria-label="Upload Profile Picture"
                component="span"
              >
                <PhotoCamera className={classes.photoIcon} />
              </IconButton>
            </label>
            <input
              className={classes.input}
              accept="image/*"
              type="file"
              onChange={uploadProfileBanner}
              id="uploadBanner"
            />
            <ProfileBanner profileBanner={profileBanner} />
          </div>
          {/*input for uploading profile picture */}
          <div className={classes.pictureWrapper}>
            <ProfilePic profilePicture={profilePicture} />
            <label htmlFor="uploadPicture">
              <IconButton
                size="medium"
                color="primary"
                aria-label="Upload Profile Banner Image"
                component="span"
              >
                <PhotoCamera className={classes.photoIcon} />
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
          <div className={classes.basicInfo}>
            <p>{userProfile?.profile?.userName}</p>
            <p>
              {userProfile?.profile?.city}, {userProfile?.profile?.state}
            </p>
            {userProfile?.profile?.type === "Organization" ? (
              <p>{extendedProfile?.website}</p>
            ) : null}
          </div>
          <div className={classes.socialHandles}>
            <FontAwesomeIcon icon={faFacebookSquare} className={classes.icons} />
            <FontAwesomeIcon icon={faTwitterSquare} className={classes.icons} />
            <FontAwesomeIcon icon={faInstagram} className={classes.icons} />
          </div>
        </div>
        <div className={classes.middleProfileWrapper}>
          <div className={classes.bioWrapper}>
            <div>{userProfile?.profile?.bio}</div>
          </div>
          {userProfile?.profile?.type === "Individual" ? (
            <div className={classes.infoWrapper}>
              <div className={classes.extendedWrapper}>
                <p>{disability?.physicalDisability}</p>
                <p>{disability?.detailedDisabilities}</p>
              </div>
              <div className={classes.demographicWrapper}>
                <p>{demographicProfile?.veteranStatus}</p>
                <p>{demographicProfile?.militaryBranch}</p>
              </div>
              <div className={classes.sportsWrapper}>
                <ul className={classes.sportsList}>
                  {filteredKeys.map(sport => (
                    <li className={classes.sportItem}>{sport}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <UpcomingEventList userName={userName} />
      </div>
    </div>
  );
}
