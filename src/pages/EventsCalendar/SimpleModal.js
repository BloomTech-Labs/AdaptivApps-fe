import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { Container, Box, Button, Typography } from "@material-ui/core";
import eventImg from "../../assets/images/acs_hartford.png";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "40rem",
    height: "56.8rem",
    backgroundColor: "white",
    padding: "0",
    "& .MuiButton-label": {
      fontSize: theme.typography.button.fontSize,
    },
  },
  imgBox: {
    width: "100%",
  },
  btn: {
    padding: "0",
    "& .MuiButton-label": {
      fontSize: theme.typography.button.fontSize,
    },
    fontWeight: "500",
    textTransform: "none",
    color: "#2962FF",
  },
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
  modalMiddle: {
    padding: "2rem 0 2rem 2rem",
    marginBottom: "2rem",
  },
  date: {
    color: "#808080",
    fontSize: "1.4rem",
  },
  title: {
    fontSize: "2.1rem",
  },
  loc: {
    color: "#808080",
    fontSize: "1.6rem",
  },
  details: {
    marginTop: "2rem",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "13rem",
    fontSize: "1.4rem",
    paddingRight: "1rem",
  },
  modalBottom: {
    marginLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-end",
  },
  modalP: {
    margin: "1.2rem 0",
    fontSize: "2.1rem",
    color: "#2962FF",
  },
  modalBtn1: {
    padding: "1rem 2.5rem",
    margin: "0 1.5rem 0 0",
    fontSize: "1.4rem",
    color: "#2962FF",
    border: "1px solid #2962FF",
    borderRadius: "5px",
    textTransform: "none",
    boxSizing: "border-box",
    "&:hover": {
      background: "#2962FF",
      color: "white",
    },
  },
  modalBtn2: {
    padding: "1rem 2.4rem",
    margin: "0 0 0 1.5rem",
    fontSize: "1.4rem",
    background: "#2962FF",
    color: "white",
    border: "1px solid #2962FF",
    borderRadius: "5px",
    textTransform: "none",
    boxSizing: "border-box",
    "&:hover": {
      background: "white",
      color: "#2962FF",
    },
  },
}));

export default function SimpleModal({ event, registerEvent }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Container style={modalStyle} className={classes.paper}>
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
        <Typography className={classes.title} id="simple-modal-title">
          {event.title}
        </Typography>
        <Typography className={classes.loc}>{event.location}</Typography>
        <Typography className={classes.details} id="simple-modal-description">
          {event.details}
        </Typography>
      </Box>
      <Box className={classes.modalBottom}>
        <p className={classes.modalP}>Add to "My Events?"</p>
        <Box>
          <Button className={classes.modalBtn1} onClick={registerEvent}>
            Add
          </Button>
          <Button className={classes.modalBtn2} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Container>
  );

  return (
    <div>
      <Button className={classes.btn} onClick={handleOpen}>
        View Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
