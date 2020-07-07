import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import moment from "moment";

import config from "../../config/auth_config";
import eventImg from "../../assets/images/acs_hartford.png";
import { useMutation } from "react-apollo";
// Component imports
import SimpleModal from "./SimpleModal";
import DeleteModal from "../../theme/DeleteModal";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { DELETE_EVENT } from "./queries";
import { REGISTER_FOR_EVENT } from "./queries/joinEvent";
// IMport stylings
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "35rem",
    backgroundColor: "transparent",
    borderRadius: ".5rem",
    marginRight: "2.4rem",
    boxShadow: "none",
  },
  cardDate: {
    fontSize: "1.4rem",
  },
  cardTitle: {
    fontSize: "2.1rem",
    margin: ".4rem 0",
    fontWeight: "500",
    color: "#3C3C3C",
    "&.MuiTypography-root": {
      wordBreak: "break-word",
    },
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
    fontSize: "1.6rem",
    fontWeight: "500",
    textTransform: "none",
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
  editDeleteBtn: {
    height: "40px",
    display: "flex",
    justifyContent: "center",
    padding: "0",
    margin: "0",
    "& button": {
      minWidth: "40px",
      margin: "0",
      padding: "0",
    },
  },
  // contentWrapper: {
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
  imgBox: {
    width: "100%",
  },
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
  date: {
    color: "#808080",
    fontSize: "1.4rem",
  },
  loc: {
    color: "#808080",
    fontSize: "1.6rem",
  },
  modalMiddle: {
    padding: "2rem 0 0rem 2rem",
    textAlign: "left",
  },
  details: {
    marginTop: "2rem",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "13rem",
    fontSize: "1.4rem",
    paddingRight: "1rem",
  },
  question: {
    color: "#2962FF",
    fontWeight: 500,
    marginTop: 58,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function EventCard({ event, refetch, user }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [registerForEvent] = useMutation(REGISTER_FOR_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [open, setOpen] = useState(false);
  // will open DeleteModal when invoked
  const handleOpen = () => {
    setOpen(true);
  };
  // will close DeleteModal when invoked
  const handleClose = () => {
    setOpen(false);
  };

  const processAttendeeID = () => {
    if (event && event.attendees) {
      for (let i = 0; i < event.attendees.length; i++) {
        if (event.attendees[i].eventProfile.email === user.email)
          return event.attendees[i].id;
      }
    } else {
      return false;
    }
  };

  const registerEvent = async () => {
    const attendeeIdValue = !processAttendeeID() ? "" : processAttendeeID();
    await registerForEvent({
      variables: {
        attendeeId: attendeeIdValue,
        eventId: event.id,
        eventProfile: user.email,
      },
    });
    await navigate(`/calendar/${event.id}`);
  };

  const editEvent = async () => {
    await navigate(`/editEvent/${event.id}`);
  };
  const removeEvent = async () => {
    await deleteEvent({
      variables: { id: event.id },
    });
    await handleClose();
    refetch();
  };

  const body = (
    <>
      <Box className={classes.imgBox}>
        <img
          className={classes.img}
          src={
            event?.imgUrl === null ||
            event?.imgUrl === undefined ||
            event?.imgUrl === ""
              ? eventImg
              : event?.imgUrl
          }
          alt="Event"
        />
      </Box>
      <Box className={classes.modalMiddle}>
        <Typography className={classes.date}>
          {moment(event.startDate).format("MM/DD/YYYY")} -{" "}
          {moment(event.endDate).format("MM/DD/YYYY")}
        </Typography>
        <Typography variant="h2" id="simple-modal-title">
          {event.title}
        </Typography>
        <Typography className={classes.loc}>{event.location}</Typography>
        <Typography className={classes.details} id="simple-modal-description">
          {event.details}
        </Typography>
        <Typography variant="h2" className={classes.question}>
          Delete this event?
        </Typography>
      </Box>
    </>
  );
  return (
    <>
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
          <Box className={classes.contentWrapper}>
            <CardContent className={classes.content}>
              <Typography
                className={classes.cardContainer}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <span className={classes.cardDate}>
                  {moment(event.startDate).format("MM/DD/YYYY")}{" "}
                </span>
                <span className={classes.cardDate}>
                  {event.startTime &&
                    !event.endTime &&
                    event.startTime !== event.endTime &&
                    `${moment(event.startTime, "HH:mm").format("h:mm A")} PST`}
                  {event.startTime &&
                    event.endTime &&
                    event.endTime === event.startTime &&
                    `${moment(event.startTime, "HH:mm").format("h:mm A")} PST`}
                  {event.startTime &&
                    event.endTime &&
                    event.endTime !== event.startTime &&
                    " - "}
                  {!event.startTime && event.endTime && "Ends at "}
                  {event.endTime &&
                    event.endTime !== event.startTime &&
                    `${moment(event.endTime, "HH:mm").format("h:mm A")} PST`}
                </span>
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
          </Box>
        </CardActionArea>
        <CardActions className={classes.btnContainer}>
          <SimpleModal event={event} registerEvent={registerEvent} />
          {user && user[config.roleUrl].includes("Admin") ? (
            <Box className={classes.editDeleteBtn}>
              <Button aria-label="edit this event" onClick={editEvent}>
                <EditOutlinedIcon
                  className={classes.icon}
                  color="primary"
                  fontSize="large"
                />
              </Button>
              <Button aria-label="delete this event" onClick={handleOpen}>
                <DeleteOutlineIcon
                  className={classes.icon}
                  color="primary"
                  fontSize="large"
                />
              </Button>
            </Box>
          ) : null}
        </CardActions>
      </Card>
      <DeleteModal
        onClick={removeEvent}
        open={open}
        body={body}
        handleClose={handleClose}
      />
    </>
  );
}
