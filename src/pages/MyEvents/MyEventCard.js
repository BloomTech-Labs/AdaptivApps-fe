//React imports
import React, { useEffect } from "react";
//Component imports
import eventImg from "../../assets/images/acs_hartford.png";
import moment from "moment";
import { useNavigate } from "@reach/router";
// GraphQL/Apollo imports
import { useMutation, useQuery } from "react-apollo";
import {
  UNREGISTER_FROM_EVENT,
  UNREGISTER_FROM_ALL,
  GET_ATTENDEES,
  GET_PARTICIPANTS,
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
  Tooltip,
} from "@material-ui/core";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

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
  socialBtnContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "0",
    margin: "1.6rem 0",
  },
  socialMediaBtn: {
    margin: "-10px 10px 0 10px",
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
  const { data, refetch: participantRefetch } = useQuery(GET_PARTICIPANTS, {
    variables: { email: user.email, id: event?.id },
    fetchPolicy: "no-cache",
  });
  const { data: attendeeData } = useQuery(GET_ATTENDEES, {
    variables: { email: user.email, id: event?.id },
    fetchPolicy: "no-cache",
  });
  const [unregisterFromEvent] = useMutation(UNREGISTER_FROM_EVENT);
  const [unregisterFromAll] = useMutation(UNREGISTER_FROM_ALL);
  const [
    unregisterFromEventActivity,
  ] = useMutation(UNREGISTER_FROM_EVENT_ACTIVITY, { fetchPolicy: "no-cache" });

  // Unregisters user from specified event and all it's activities
  const eventUnregister = async () => {
    const participantId = data?.participants?.map(participant => {
      if (participant) {
        if (participant.activityProfile.email === user.email) {
          return participant?.id;
        }
      }
    });
    const attendeeId = attendeeData?.participants?.map(attendee => {
      if (attendee) {
        if (attendee.eventProfile.email === user.email) {
          return attendee?.id;
        }
      }
    });
    const participantIdValue = JSON.stringify(participantId).replace(
      /[\[\]"]+/g,
      ""
    );
    const attendeeIdValue = JSON.stringify(attendeeId).replace(/[\[\]"]+/g, "");
    data?.participants && data?.participants?.length === 1
      ? await unregisterFromEventActivity({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
            participantId: participantIdValue,
          },
        })
      : data && data?.participants === null
      ? await unregisterFromEvent({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
          },
        })
      : await unregisterFromAll({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
            participantId: participantId,
          },
        });
    await refetch();
  };
  const viewEventDetails = async () => {
    await navigate(`/myevents/${event?.id}`);
  };
  // useEffect(() => {
  //   participantRefetch();
  // }, [data, participantRefetch]);
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
            image={
              event?.imgUrl === null ||
              event?.imgUrl === undefined ||
              event?.imgUrl === ""
                ? eventImg
                : event?.imgUrl
            }
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
            {moment(event.startDate).format("MM/DD/YYYY")}
            {" - "}
            {moment(event.endDate).format("MM/DD/YYYY")}
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
        <Button className={classes.btn} onClick={eventUnregister}>
          Unregister
        </Button>
      </CardActions>
      {/* <div className={classes.socialBtnContainer}>
        <Tooltip title="Share this event on Facebook">
          <FacebookShareButton
            url={"http://angelcitysports.org/"}
            quote={`I'm attending an event!\nEvent Name: ${
              event.title
            }\nStarts: ${moment(event.startDate).format(
              "MM/DD/YYYY"
            )}\nWhere: ${event.location}`}
            className={classes.socialMediaBtn}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </Tooltip>
        <Tooltip title="Share this event on Twitter">
          <TwitterShareButton
            title={`I'm attending an event!\nEvent Name: ${
              event.title
            }\nStarts: ${moment(event.startDate).format(
              "MM/DD/YYYY"
            )}\nWhere: ${event.location}\n`}
            url={"http://angelcitysports.org/"}
            via={"angelcitysports"}
            className={classes.socialMediaBtn}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </Tooltip>
        <Tooltip title="Share this event on Linkedin">
          <LinkedinShareButton
            title={"Angel City Sports Event"}
            summary={`I'm attending an event!\nEvent Name: ${
              event.title
            }\nStarts: ${moment(event.startDate).format(
              "MM/DD/YYYY"
            )}\nWhere: ${event.location}`}
            url={"http://angelcitysports.org/"}
            className={classes.socialMediaBtn}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </Tooltip>
      </div> */}
    </Card>
  );
}
