import React, { useState, useEffect } from "react";
import SearchEventCard from "./SearchEventCard";
import moment from "moment";
import { Typography, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    eventGroup: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        "& h1": {
            fontWeight: "600",
            color: "#808080",
        },
    },
    eventCard: {
        display: "flex",
        flexWrap: "wrap",
    },
}));

export default function SearchEventList({ eventsList, refetch }) {
    const classes = useStyles();

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
