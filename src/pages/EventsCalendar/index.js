import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminTagsSearch from "./AdminTagsSearch";
import EventList from "./EventList";
import { GET_EVENT_LIST } from "./queries";
import { useAuth0 } from "../../config/react-auth0-spa";
import GlobalSearchBox from "../../routes/DashRouter/GlobalSearchBox";
import SponsorBanner from "../SponsorSpotlight/SponsorBanner";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    // Changed from 90 to 100, JC6/23
    width: "100%",
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
    color: "#2763FF",
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
});

export default function EventsCalendar() {
  const { user } = useAuth0();
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_EVENT_LIST, {
    fetchPolicy: "no-cache",
  });
  const [isSearching, setIsSearching] = useState(false);

  // refetches EVENT_LIST without refreshing page
  useEffect(() => {
    refetch();
  }, [refetch]);
  const currentEvents = data?.events;
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
              Upcoming Events
            </Typography>
          </Box>
          {/* {user && user[config.roleUrl].includes("Admin") ? ( */}
          <AdminTagsSearch
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
          <div className={classes.search2}>
            <GlobalSearchBox />
          </div>
          {/* ) : null} */}
          <Grid className={classes.grid}>
            {!isSearching ? (
              <EventList
                currentEvents={currentEvents}
                refetch={refetch}
                user={user}
              />
            ) : null}
          </Grid>
        </main>
      </div>
    </>
  );
}
