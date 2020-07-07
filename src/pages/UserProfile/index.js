import React, { useState, useEffect } from "react";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
//Reach Router imports
import { useParams } from "@reach/router";
//s3 bucket imports
import S3FileUpload from "react-s3";
// Material-UI and styling imports
import { makeStyles, Link } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-apollo";
import { GET_USER_PROFILE, GET_LOGGED_IN_USER } from "./queries";
import ProfilePic from "./ProfilePic";
import ProfileBanner from "./ProfileBanner";
import UpcomingEventList from "./UpcomingEventList";
import UserFeedposts from "./UserFeedposts";

const FacebookIcon = require("../../assets/images/facebook.png");
const TwitterIcon = require("../../assets/images/twitter.png");
const InstagramIcon = require("../../assets/images/instagram.png");

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100vw",
    width: "100%",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  icon: {
    width: "2.4rem",
    borderRadius: ".3rem",
  },

  profileEventWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  profileWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  topProfileWrapper: {
    maxHeight: "25rem"
  },
  bannerWrapper: {
    width: "100%",
    height: "18rem",
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
    position: "relative",
    width: "17rem",
    height: "17rem",
    bottom: "11rem",
    margin: "0 auto",
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
    maxHeight: "100vh",
    width: "32rem",
    border: "none",
    boxShadow: "none",
    backgroundColor: "white",
    overflowY: "scroll",
    scrollbarColor: "white white",
    "& h3": {
      textAlign: "center",
    },
    [theme.breakpoints.down("sm")]: {
      // margin: "0 auto",
      // width: "80%",
      display: "none",
    },
  },
  eventsContainerResponsive: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      marginTop: "2rem",
      flexDirection: "column",
      maxHeight: "100vh",
      width: "32rem",
      border: "none",
      boxShadow: "none",
      backgroundColor: "white",
      overflowY: "scroll",
      scrollbarColor: "white white",
      "& h3": {
        textAlign: "center",
      },
      margin: "0 auto",
      width: "80%",
    },
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    "& h3": {
      textAlign: "center",
    },
  },
  basicInfo: {
    height: "3rem",
    display: "flex",
    justifyContent: "center",
  },
  basicP: {
    maxWidth: "50rem",
    minWidth: "30rem",
    display: "flex",
    justifyContent: "space-around",
    alignSelf: "flex-start",

    "& p": {
      margin: "0 auto",
      fontSize: "1.2rem",
      fontWeight: "700",
    },
  },
  socialHandles: {
    width: "30rem",

    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
  socialIcons: {
    width: "80%",
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
    height: "300px",
  },
  bioWrapper: {
    margin: "0 auto",
    height: "50%",
    width: "75%",
    maxWidth: "80rem",
    "& p": {
      marginLeft: "1rem",
      fontSize: "1.6rem",
    },
    "& h1": {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
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
    await S3FileUpload.uploadFile(e.target.files[0], profilePictureConfig)
      .then(async data => {
        if (data && data?.location) {
          await setProfilePicture(data && data?.location);
        }
      })
      .catch(async err => {
        console.log(err);
      });
  };

  const uploadProfileBanner = async e => {
    e.preventDefault();
    await S3FileUpload.uploadFile(e.target.files[0], profileBannerConfig)
      .then(async data => {
        if (data && data?.location) {
          await setProfileBanner(data && data?.location);
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

  const twitterURL = userProfile?.profile?.twitter;
  const facebookURL = userProfile?.profile?.facebook;
  const instagramURL = userProfile?.profile?.instagram;
  const name = userProfile?.profile?.firstName;

  useEffect(() => {
    if (loggedInUser && loggedInUserName === userName) setProfileOwner(true);
  }, [userProfile, profilePicture, profileBanner, profileOwner]);

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
                  <label htmlFor="uploadBanner">
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
                    id="uploadBanner"
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
                  <label htmlFor="uploadPicture">
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
                    id="uploadPicture"
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className={classes.basicInfo}>
            <div className={classes.basicP}>
              <p>{userProfile?.profile?.userName}</p>
              {/* <p>
                {userProfile?.profile?.city}, {userProfile?.profile?.state}
              </p> */}
              {userProfile?.profile?.type === "Organization" ? (
                <p>{extendedProfile?.website}</p>
              ) : null}
            </div>
          </div>
          <div className={classes.socialHandles}>
            <div className={classes.socialIcons}>
              <Link
                href={facebookURL}
                target="_blank"
                rel="noopener"
                aria-label={`Visit ${name}s Facebook profile.`}
              >
                <img src={FacebookIcon} className={classes.icon} />
              </Link>
              <Link
                href={twitterURL}
                target="_blank"
                rel="noopener"
                aria-label={`Visit ${name}s Twitter profile.`}
              >
                <img src={TwitterIcon} className={classes.icon} />
              </Link>
              <Link
                href={instagramURL}
                target="_blank"
                rel="noopener"
                aria-label={`Visit ${name}s Instagram profile.`}
              >
                <img src={InstagramIcon} className={classes.icon} />
              </Link>
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
          {userProfile?.profile?.type === "Individual" ? (
            <div className={classes.eventsContainerResponsive}>
              <UpcomingEventList userName={userName} />
            </div>
          ) : null}
          {userProfile?.profile?.type === "Individual" ? (
            <div className={classes.postsContainer}>
              <UserFeedposts user={user} userName={userName} />
            </div>
          ) : null}
        </div>
        {userProfile?.profile?.type === "Individual" ? (
          <div className={classes.eventsContainer}>
            <UpcomingEventList userName={userName} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
