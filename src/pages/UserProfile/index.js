import React, { useState, useEffect } from "react";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

//Reach Router imports
import { useParams } from "@reach/router";

//s3 bucket imports
import S3FileUpload from "react-s3";

// Material-UI and styling imports
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

import { GET_USER_PROFILE, GET_LOGGED_IN_USER } from "./queries";
import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";
import UpcomingEventList from "./UpcomingEventList";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100vw",
    width: "90%",
    display: "flex",
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
  profileEventWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
  },
  profileWrapper: {
    width: "100%",
  },
  topProfileWrapper: {},
  bannerWrapper: {
    width: "100%",
    height: "20vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    "& label": {
      padding: "0 2rem 1rem 0",
      position: "absolute",
    },
  },
  photoIcon: {
    fontSize: "3rem",
    position: "absolute",
    color: "black",
    borderRadius: "50%",
    background: "white",
    padding: "2px",
  },
  pictureWrapper: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    width: "17rem",
    height: "17rem",
    top: "6rem",
    left: "40%",
    "& label": {
      position: "absolute",
      left: "70%",
      top: "80%",
    },
  },
  eventsContainer: {
    display: "flex",
    marginTop: "2rem",
    flexDirection: "column",
    alignSelf: "flex-start",
    alignContent: "flex-end",
    marginLeft: "10px",
    maxHeight: "100vh",
    maxWidth: "300px",
    border: "none",
    boxShadow: "none",
    backgroundColor: "white",
    // overflow: "scroll",
    // scrollbarColor: "white white",
  },
  basicInfo: {
    height: "8rem",
    display: "flex",
    justifyContent: "center",
  },
  basicP: {
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    "& p": {
      margin: "0",
      fontSize: "1.2rem",
      fontWeight: "700",
    },
  },
  socialHandles: {
    display: "flex",
    justifyContent: "center",
  },
  socialIcons: {
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  infoWrapper: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
    "& h1": {
      margin: "0",
      fontSize: "1.4rem",
    },
    "& h3": {
      fontSize: "1.2rem",
      marginLeft: "1rem",
    },
  },
  middleProfileWrapper: {
    marginTop: "2rem",
    // display: "flex",
    // justifyContent: "center",
    height: "580px",
  },
  bioWrapper: {
    margin: "0 auto",
    height: "60%",
    width: "75%",
    maxWidth: "80rem",
    "& p": {
      marginLeft: "1rem",
      fontSize: "1.2rem",
    },
    "& h1": {
      fontSize: "1.4rem",
    },
  },
  sportsList: {
    marginLeft: "1rem",
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const { userName } = useParams();
  const { user } = useAuth0();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);
  const [profileOwner, setProfileOwner] = useState(false);

  const { data: userProfile, loading, error, refetch } = useQuery(
    GET_USER_PROFILE,
    {
      variables: { userName: userName },
    }
  );
  const { data: loggedInUser } = useQuery(GET_LOGGED_IN_USER, {
    variables: { email: user.email },
  });

  const loggedInUserName = loggedInUser?.profile?.userName;
  const extendedProfile = userProfile?.profile?.extProfile;

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
        console.log(data);
        if (data && data?.location) {
          await setProfilePicture(data && data?.location);
          console.log(data?.location);
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
    e.preventDefault();
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

  const handleBannerEnter = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("uploadBanner");
      button.click();
    }
  };

  const handlePictureEnter = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("uploadPicture");
      button.click();
    }
  };

  useEffect(() => {
    if (loggedInUser && loggedInUserName === userName) setProfileOwner(true);
  }, [userProfile, profilePicture, profileBanner, profileOwner]);
  // console.log("Profile Owner", profileOwner);
  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.root}>
      <div className={classes.profileEventWrapper}>
        <div className={classes.profileWrapper}>
          <div className={classes.topProfileWrapper}>
            {/*input for uploading profile picture */}
            <div className={classes.bannerWrapper}>
              {profileOwner === true ? (
                <>
                  <label htmlFor="uploadPicture">
                    <IconButton
                      className={classes.photoButton}
                      color="primary"
                      size="medium"
                      aria-label="Upload Profile Picture"
                      component="span"
                      onKeyDown={e => handleBannerEnter(e)}
                    >
                      <PhotoCamera className={classes.photoIcon} />
                    </IconButton>
                  </label>
                  <input
                    className={classes.input}
                    accept="image/*"
                    type="file"
                    onChange={uploadProfileBanner}
                    id="uploadPicture"
                  />
                </>
              ) : null}
              <ProfileBanner
                profileBanner={profileBanner}
                userName={userName}
              />
            </div>
            {/*input for uploading profile banner */}
            <div className={classes.pictureWrapper}>
              <ProfilePic profilePicture={profilePicture} userName={userName} />
              {profileOwner === true ? (
                <>
                  <label htmlFor="uploadBanner">
                    <IconButton
                      size="medium"
                      color="primary"
                      aria-label="Upload Profile Banner Image"
                      component="span"
                      onKeyDown={e => handlePictureEnter(e)}
                    >
                      <PhotoCamera className={classes.photoIcon} />
                    </IconButton>
                  </label>
                  <input
                    className={classes.input}
                    accept="image/*"
                    type="file"
                    onChange={uploadProfilePicture}
                    id="uploadBanner"
                  />
                </>
              ) : null}
            </div>
            <div className={classes.basicInfo}>
              <div className={classes.basicP}>
                <p>{userProfile?.profile?.userName}</p>
                <p>
                  {userProfile?.profile?.city}, {userProfile?.profile?.state}
                </p>
                {userProfile?.profile?.type === "Organization" ? (
                  <p>{extendedProfile?.website}</p>
                ) : null}
              </div>
            </div>
            <div className={classes.socialHandles}>
              <div className={classes.socialIcons}>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className={classes.icons}
                />
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  className={classes.icons}
                />
                <FontAwesomeIcon icon={faInstagram} className={classes.icons} />
              </div>
            </div>
          </div>
          <div className={classes.middleProfileWrapper}>
            <div className={classes.bioWrapper}>
              <h1>My Story.</h1>
              <div>
                <p>{userProfile?.profile?.bio}</p>
              </div>
            </div>
            {/* {userProfile?.profile?.type === "Individual" ? (
              <div className={classes.infoWrapper}>
                <h1>You'll find me...</h1>
                <div className={classes.extendedWrapper}>
                  <p>{disability?.physicalDisability}</p>
                  <p>{disability?.detailedDisabilities}</p>
                </div>
                <div className={classes.demographicWrapper}>
                  <p>{demographicProfile?.veteranStatus}</p>
                  <p>{demographicProfile?.militaryBranch}</p>
                </div>
                <div className={classes.sportsWrapper}>
                  <h3>Playing these sports</h3>
                  <div className={classes.sportsList}>
                    {filteredKeys.map(sport => (
                      <p className={classes.sportItem}>
                        {sport.charAt(0).toUpperCase() +
                          sport
                            .substr(1)
                            .split(/(?=[A-Z])/)
                            .join(" ")}
                        , &nbsp;
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null} */}
          </div>
        </div>
        <div className={classes.eventsContainer}>
          <UpcomingEventList userName={userName} />
        </div>
      </div>
    </div>
  );
}
