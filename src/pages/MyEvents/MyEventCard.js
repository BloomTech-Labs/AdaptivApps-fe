//React imports
import React from "react";
//Component imports
import { useNavigate } from "@reach/router";
// GraphQL/Apollo imports
import { useMutation, useQuery } from "react-apollo";
import {
  UNREGISTER_FROM_ALL,
  GET_PARTICIPANT_IDS,
  UNREGISTER_FROM_EVENT_ACTIVITY,
} from "./queries";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
//Styling imports
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: ".5rem",
    marginRight: "2.4rem",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  cardDate: {
    fontSize: "1.4rem",
  },
  cardTitle: {
    fontSize: "2.1rem",
    margin: ".4rem 0",
    fontWeight: "500",
    color: "#3C3C3C",
  },
  cardLoc: {
    fontSize: "1.6rem",
  },
  content: {
    padding: "1.5rem 0 0 0",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    margin: "1.6rem 0",
  },
  btn: {
    padding: "0",
    fontWeight: "400",
    textTransform: "none",
    color: "#2962FF",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
  },
  cardImg: {
    borderRadius: ".5rem",
    maxWidth: "36rem",
    maxHeight: "16rem",
  },
  banner: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    transform: "rotate(-45deg)",
    top: "4.9rem",
    right: "3rem",
    borderBottom: "2.5rem solid #555",
    borderLeft: "2.5rem solid transparent",
    borderRight: "2.5rem solid transparent",
    height: "0",
    color: "#EECC1B",
    width: "12.75rem",
    textAlign: "center",
    fontSize: "1.6rem",
  },
}));

export default function MyEventCard({ event, refetch }) {
  const classes = useStyles();
  const navigate = useNavigate();
  // Retrieves current user info from Auth0
  const { user } = useAuth0();
  const { data } = useQuery(GET_PARTICIPANT_IDS, {
    variables: { email: user.email, id: event.id },
    fetchPolicy: "no-cache",
  });
  const [unregisterFromAll] = useMutation(UNREGISTER_FROM_ALL);
  const [unregisterFromEventActivity] = useMutation(
    UNREGISTER_FROM_EVENT_ACTIVITY
  );
  // Unregisters user from specified event and all it's activities
  const unregisterFromEvent = async () => {
    const participantIds = data?.participants?.map(participant => {
      return participant.id;
    });

    const participantIdValue = data?.participants?.map(participant => {
      return participant.id;
    });

    const participantId = JSON.stringify(participantIdValue).replace(
      /[\[\]"]+/g,
      ""
    );

    data && data?.participants?.length === 1
      ? await unregisterFromEventActivity({
          variables: {
            id: event.id,
            email: user.email,
            participantId: participantId,
          },
        })
      : data && data?.participants === null
      ? await unregisterFromEvent({
          variables: {
            id: event.id,
            email: user.email,
          },
        })
      : await unregisterFromAll({
          variables: {
            id: event.id,
            email: user.email,
            participantIds: participantIds,
          },
        });
    await refetch();
  };
  const viewEventDetails = async () => {
    await navigate(`/myevents/${event?.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <Box>
          <div className={classes.banner}>{event.type}</div>
          <CardMedia
            className={classes.cardImg}
            component="img"
            alt="Event"
            width="15rem"
            image={event?.imgUrl}
            title="Angel City Event"
          />
        </Box>
        <CardContent className={classes.content}>
          <Typography
            className={classes.cardDate}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {event.startDate} - {event.endDate}
          </Typography>
          <Typography
            className={classes.cardTitle}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {event.title}
          </Typography>
          <Typography
            className={classes.cardLoc}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {event.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.btnContainer}>
        <Button onClick={viewEventDetails} className={classes.btn}>
          View Details
        </Button>
        <Button className={classes.btn} onClick={unregisterFromEvent}>
          Unregister
        </Button>
      </CardActions>
    </Card>
  );
}
