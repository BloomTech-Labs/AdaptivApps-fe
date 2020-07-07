// React imports
import React, { useEffect } from "react";
import { useNavigate, Link } from "@reach/router";
// Component imports
import EventList from "./EventList";
import GlobalSearchBox from "../../routes/DashRouter/GlobalSearchBox";
import SponsorBanner from "../SponsorSpotlight/SponsorBanner";
// GraphQL/Apollo imports
import { useQuery } from "react-apollo";
import { GET_USER_EVENTS } from "./queries";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Styling imports
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    // Changed from 90 to 100, JC6/23
    width: "100%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginLeft: "3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2962FF",
  },
  noActiv: {
    marginLeft: "3rem",
  },
  noActivBlue: {
    marginLeft: "3rem",
    color: "#2962FF",
    "&:hover": {
      cursor: "pointer",
    },
  },
  inlineNotice: {
    display: "inline-flex",
  },
  search: {
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    margin: "2.4rem 0 -2.4rem 0",
  },
  search2: {
    height: "38px",
    marginLeft: "3rem",
    marginBottom: "25px",
    "@media (min-width: 850px)": {
      display: "none",
    },
  },
  redirLink: {
    textDecoration: "none",
  },
});

export default function MyEvents() {
  const classes = useStyles();
  // Retrieves logged in user info
  const { user } = useAuth0();
  // Retrieves all events a user is registered to
  const { error, loading, data, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { email: user.email },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div>
        <SponsorBanner />
      </div>
      <div>
        <div className={classes.search}>
          <GlobalSearchBox />
        </div>
        <main className={classes.root}>
          <Box className={classes.headingBox} borderBottom={2}>
            <Typography className={classes.heading} variant="h1" gutterBottom>
              My Events
            </Typography>
          </Box>
          <div className={classes.search2}>
            <GlobalSearchBox />
          </div>
          {data.events.length >= 1 ? (
            <Grid className={classes.grid}>
              <EventList data={data} refetch={refetch} />
            </Grid>
          ) : (
              <>
                <Typography className={classes.noActiv}>
                  You haven't registered for any events yet!
              </Typography>
                <Box className={classes.inlineNotice}>
                  <Link
                    to="/calendar"
                    aria-label="check out the event calendar page"
                    className={classes.redirLink}
                  >
                    <Typography className={classes.noActivBlue}>
                      Check out the Events Calendar
                  </Typography>
                  </Link>
                  <Typography>
                    , register for an event, then see all of your registered
                    events here!
                </Typography>
                </Box>
              </>
            )}
        </main>
      </div>
    </>
  );
}
