import React, { useEffect } from "react";
import SearchEventCard from "./SearchEventCard";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  eventGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& h1": {
      fontWeight: "600",
      color: "#808080",
    },
    marginLeft: "3rem",
  },
  eventCard: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function SearchEventList({ eventsList, refetch }) {
  const classes = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <div className={classes.eventGroup}>
      <Typography variant="h1">Events</Typography>
      <div className={classes.eventCard}>
        {eventsList?.map((event, id) => (
          <SearchEventCard key={id} event={event} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
