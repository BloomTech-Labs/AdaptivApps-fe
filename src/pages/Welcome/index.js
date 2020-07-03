// React/Reach Router imports
import React, { useEffect } from "react";
import { Link } from "@reach/router";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Apollo/GraphQL imports
import { useQuery, useMutation } from "react-apollo";
import { ADD_USER_PROFILE, PROFILE_INFO } from "../UserSettings/queries";
// Material-UI imports
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    width: "90%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    "& .MuiTab-wrapper": {
      fontSize: "1.6rem",
    },
    "& strong": {
      fontSize: "1.8rem",
    },
    "& acsLink": {
      textDecoration: "none",
      color: "black",
      fontSize: "1.8rem",
    },
    "& i": {
      fontStyle: "italic",
      fontSize: "1.8rem",
    },
  },
  a11yLink: {
    fontSize: "1.8rem",
    color: "#2962FF",
    textDecoration: "underline",
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  body: {
    marginLeft: "3rem",
    marginBottom: "5rem",
  },
  h3: {
    fontSize: "2.4rem",
    color: "rgb(41, 98, 255)",
    fontWeight: "normal",
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const [createProfile] = useMutation(ADD_USER_PROFILE);
  const userEmail = user.email;
  // Fetch profile for the user using the email associated with auth0 login
  const { loading, error, data, refetch } = useQuery(PROFILE_INFO, {
    variables: { email: userEmail },
  });
  const profile = data?.profile;

  // Extract the profile from returning data of useQuery
  useEffect(() => {
    if (error) {
      return <p>Error</p>;
    }
    // If user does not have a profile in backend, create one for them
    if (!loading && !profile?.id) {
      newProfile();
    }
    if (profile) {
      refetch();
    }
    // eslint-disable-next-line
  }, [profile]);

  // Function that creates a profile for given email
  const newProfile = async () => {
    await createProfile({ variables: { email: userEmail } });
    refetch();
  };

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Welcome to the Angel City Sports Platform!
        </Typography>
      </Box>
      <div className={classes.body}>
        <h3 className={classes.h3}>A Welcome Message From Us to You</h3>
        <Typography>
          This accessible website will be your home for the 2020 Angel City
          Virtual Games presented by The Hartford. The entire Angel City Team is
          thrilled you are here to participate in three epic weeks of sports,
          special events, community fun, and most of all-connection.
          <br />
          <br />
          Be sure to browse the <strong>Events Calendar</strong> and select
          which events you are interested in attending this week and utilize the{" "}
          <strong>Chat</strong> to connect with friends, peers and coaches from
          all over the world!
          <br />
          <br />
          We are so excited for what’s ahead! Thank you so much for registering
          for the 2020 Angel City Games presented by The Hartford…this summer is
          going to be a blast!
          <br />
          <br />
          <i>
            Be sure to visit the <strong>FAQ</strong> tab for easy video
            tutorials, a system walkthrough, and more! For any additional
            information, please email <strong>info@angelcitysports.org</strong>.
          </i>
        </Typography>

        <h3 className={classes.h3}>
          The 2020 Angel City Virtual Games Presented by The Harford Explained
        </h3>
        <Typography>
          On March 12th, Angel City Sports made the tough decision to suspend
          all in-person programming and events in response to the COVID-19
          crisis. This included the 2020 Angel City Games presented by The
          Hartford. However, quickly after that decision was made, the Angel
          City team began to brainstorm ways to inspire and support our athletes
          to connect, engage, and build community all while living healthy,
          active lives. Thus, the 2020 Angel City Virtual Games presented by The
          Hartford was created!
          <br />
          <br />
          The 2020 Angel City Virtual Games presented by The Hartford will
          mirror all components the physical Games would have showcased: sport
          clinics, competitive opportunities, special events, and community
          building. The key difference-
          <strong>
            the Virtual Games will last 3 weeks as opposed to 4 days!
          </strong>
          <br />
          <br />
          Adaptive athletes along with family, friends, volunteers, and peers
          are welcome to join in on this unforgettable summer – 21 days full of
          sport, education, connection, and fun!
          <br />
          <br />
          Check out the <strong>Events Calendar</strong> tab to view all
          activities available in the upcoming week. These events will be
          continually updated as the Virtual Games will take place all summer
          long!
          <br />
          <br />
          <strong>Week 1</strong>: July 13 - 19
          <br />
          <strong>Week 2</strong>: August 3 - 9
          <br />
          <strong>Week 3</strong>: August 24 - 30
        </Typography>

        <h3 className={classes.h3}>About Angel City Sports</h3>
        <Typography>
          Angel City Sports provides year-round free adaptive sports
          opportunities for kids, adults, and veterans with physical
          disabilities or visual impairments. A chapter member of Move United,
          Angel City Sports is focused on encouraging participation in sports
          and recreation activities for people with physical disabilities and
          advancing the Paralympic movement. Debuting in 2015, the annual Angel
          City Games presented by The Hartford, is now the largest multisport
          Paralympic competition open to kids, adults, and veterans.
          <br />
          <br />
          In addition to providing free equipment, coaching, and competitive
          opportunities – Angel City focuses on how every individual can reach
          their full potential and unlock their dreams through music, art,
          higher education, and career opportunities.
          <br />
          <br />
          For more information about Angel City Sports, visit{" "}
          <a
            className={classes.acsLink}
            href="https://www.angelcitysports.org"
            target="_blank"
          >
            <strong>angelcitysports.org</strong>
          </a>{" "}
          and follow <strong>@angelcitysports</strong> on Facebook, Instagram,
          and Twitter.
        </Typography>
        <Link to="tos" className={classes.a11yLink}>
          Terms Of Service
        </Link>
        <br />
        <Link to="eula" className={classes.a11yLink}>
          End User License Agreement
        </Link>
      </div>
    </Box>
  );
};

export default Welcome;
